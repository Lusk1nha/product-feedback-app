use crate::{
    api_routes::{auth_routes::auth_routes, root_routes::root_routes},
    api_state::AppState,
    controllers::{not_found_controller::NotFoundController, root_controller::RootController},
    http::cors::configure_cors,
    middlewares::auth_middleware::auth_middleware,
};
use axum::{middleware, routing::get, Router};
use std::sync::Arc;

pub const API_PATH: &str = "/api";
pub const AUTH_PATH: &str = "/auth";

pub fn create_routes(state: Arc<AppState>) -> Router {
    let cors = configure_cors();
    let api_routes = api_routes(state.clone());

    let api_routes = api_routes.fallback(NotFoundController::not_found_route);

    Router::new().nest(API_PATH, api_routes).layer(cors)
}

pub fn protected_auth_routes(state: Arc<AppState>) -> Router {
    Router::new()
        .route("/protected", get(RootController::index))
        .with_state(state.clone())
        .layer(middleware::from_fn_with_state(
            state.clone(),
            auth_middleware,
        ))
}

pub fn api_routes(state: Arc<AppState>) -> Router {
    let root_routes = root_routes(state.clone());
    let auth_routes = auth_routes(state.clone());

    let protected_auth_routes = protected_auth_routes(state.clone());

    root_routes
        .nest(AUTH_PATH, auth_routes)
        .merge(protected_auth_routes)
}
