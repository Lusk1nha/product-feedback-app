use std::sync::Arc;

use axum::{http::StatusCode, response::IntoResponse, Json, Router};

use crate::{
    api_state::AppState,
    http::{cors::configure_cors, error_response::ErrorResponse},
};

pub const API_PATH: &str = "/api";

pub fn create_routes(state: Arc<AppState>) -> Router {
    let cors = configure_cors();
    let api_routes = api_routes(state.clone());

    let api_routes = api_routes.fallback(not_found_route);

    Router::new().nest(API_PATH, api_routes).layer(cors)
}

pub fn api_routes(state: Arc<AppState>) -> Router {
    Router::new()
}

pub async fn not_found_route() -> impl IntoResponse {
    let response = ErrorResponse {
        status_code: StatusCode::NOT_FOUND,
        message: "Route not found, for more information check the documentation".to_string(),
    };

    (StatusCode::NOT_FOUND, Json(response))
}
