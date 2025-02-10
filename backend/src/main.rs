mod api_state;
mod database;
mod environment;
mod http;
mod logger;
mod models;
mod repositories;
mod router;
mod server;
mod services;

use api_state::AppState;
use database::DatabaseApp;
use environment::EnvironmentApp;
use logger::init_logger;
use router::create_routes;
use server::start_server;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let _guard = init_logger();

    let environment = EnvironmentApp::new();

    let database = DatabaseApp::new(&environment).await?;
    database.run_migrations().await?;

    let state = AppState::new(database.clone(), environment.clone());

    let api_routes = create_routes(state.clone());

    let server_task = tokio::spawn(start_server(environment, api_routes));

    tokio::select! {
        res = server_task => {
            if let Err(e) = res {
                tracing::error!("Server task failed: {}", e);
            }
        }
        _ = tokio::signal::ctrl_c() => {
            tracing::warn!("Received shutdown signal");
        }
    }

    // Close the database connection pool
    database.close_pool().await?;

    Ok(())
}
