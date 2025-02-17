use std::sync::Arc;

use axum::{extract::State, http::StatusCode, response::IntoResponse, Json};
use once_cell::sync::Lazy;
use serde::Serialize;

use crate::{api_state::AppState, http::error_response::ErrorResponse};

static AUTHORS: Lazy<Vec<String>> =
    Lazy::new(|| vec!["Lucas Pedro da Hora <https://github.com/Lusk1nha>".to_string()]);

#[derive(Debug, Serialize)]
pub struct JsonRootResponse {
    pub title: String,
    pub description: String,
    pub version: String,
    pub authors: Vec<String>,
}

pub struct RootController;

impl RootController {
    pub async fn index(
        State(state): State<Arc<AppState>>,
    ) -> Result<impl IntoResponse, ErrorResponse> {
        let environment = &state.environment;

        let response = JsonRootResponse {
            title: "Welcome to Personal Feedbacks API".to_string(),
            description: "This is a simple API to manage feedbacks".to_string(),
            version: environment.version.to_string(),

            authors: AUTHORS.clone(),
        };

        Ok((StatusCode::OK, Json(response)))
    }
}
