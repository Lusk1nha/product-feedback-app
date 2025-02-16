use std::sync::Arc;

use axum::{routing::get, Router};

use crate::{api_state::AppState, controllers::root_controller::RootController};

pub fn root_routes(state: Arc<AppState>) -> Router {
    Router::new()
        .route("/", get(RootController::index))
        .with_state(state)
}
