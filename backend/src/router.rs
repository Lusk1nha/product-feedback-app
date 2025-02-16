use crate::{
    api_routes::{auth_routes::auth_routes, root_routes::root_routes},
    api_state::AppState,
    controllers::not_found_controller::NotFoundController,
    http::cors::configure_cors,
};
use axum::Router;
use std::sync::Arc;

pub const API_PATH: &str = "/api";
pub const AUTH_PATH: &str = "/auth";

pub fn create_routes(state: Arc<AppState>) -> Router {
    let cors = configure_cors();
    let api_routes = api_routes(state.clone());

    let api_routes = api_routes.fallback(NotFoundController::not_found_route);

    Router::new().nest(API_PATH, api_routes).layer(cors)
}

pub fn api_routes(state: Arc<AppState>) -> Router {
    let root_routes = root_routes(state.clone());
    let auth_routes = auth_routes(state.clone());

    root_routes.nest(AUTH_PATH, auth_routes)
}
