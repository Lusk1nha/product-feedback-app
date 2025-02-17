use std::sync::Arc;

use axum::{routing::post, Router};

use crate::{api_state::AppState, controllers::auth_controller::AuthController};

pub fn auth_routes(state: Arc<AppState>) -> Router {
    Router::new()
        .route("/login", post(AuthController::login))
        .route("/register", post(AuthController::register))
        .route("/refresh-token", post(AuthController::refresh))
        .with_state(state)
}
