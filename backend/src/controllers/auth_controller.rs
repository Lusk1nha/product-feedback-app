use std::sync::Arc;

use axum::{extract::State, http::StatusCode, response::IntoResponse, Json};
use axum_extra::extract::CookieJar;
use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};

use validator::Validate;

use crate::{
    api_state::AppState,
    http::{
        axum_response::ValidatedJson,
        error_response::ErrorResponse,
        error_types::{bad_request_error, internal_server_error},
    },
    models::users_model::User,
};

pub struct AuthController;

#[derive(Deserialize, Validate)]
pub struct LoginRequest {
    #[validate(
        email(message = "Invalid email format"),
        length(min = 1, message = "Email is required")
    )]
    pub email: String,

    #[validate(length(min = 8, message = "Password must be at least 8 characters"))]
    pub password: String,
}

#[derive(Deserialize, Validate)]
pub struct RegisterRequest {
    #[validate(
        email(message = "Invalid email format"),
        length(min = 1, message = "Email is required")
    )]
    pub email: String,

    #[validate(length(min = 8, message = "Password must be at least 8 characters"))]
    pub password: String,

    #[serde(rename = "confirmPassword")]
    #[validate(
        length(min = 8, message = "Password must be at least 8 characters"),
        must_match(other = "password", message = "Passwords do not match")
    )]
    pub confirm_password: String,
}

#[derive(Serialize)]
pub struct RegisterResponse {
    pub id: String,
    pub email: String,

    #[serde(rename = "createdAt")]
    pub created_at: DateTime<Utc>,
    #[serde(rename = "updatedAt")]
    pub updated_at: DateTime<Utc>,
}

impl From<User> for RegisterResponse {
    fn from(user: User) -> Self {
        Self {
            id: user.id.to_string(),
            email: user.email,
            created_at: user.created_at,
            updated_at: user.updated_at,
        }
    }
}

impl AuthController {
    pub async fn login(
        jar: CookieJar,
        State(state): State<Arc<AppState>>,
        ValidatedJson(payload): ValidatedJson<LoginRequest>,
    ) -> Result<impl IntoResponse, ErrorResponse> {
        println!("{:?}", payload.email);
        Ok((StatusCode::OK, "Login"))
    }

    pub async fn register(
        State(state): State<Arc<AppState>>,
        ValidatedJson(payload): ValidatedJson<RegisterRequest>,
    ) -> Result<impl IntoResponse, ErrorResponse> {
        let email = payload.email;
        let password = payload.password;

        match state.users_service.get_user_by_email(&email).await {
            Ok(Some(_)) => {
                return Err(bad_request_error("User with this email already exists."));
            }
            Ok(None) => {}
            Err(e) => {
                tracing::error!("Error checking if user exists: {:?}", e);
                return Err(internal_server_error("Error checking if user exists."));
            }
        };

        let create_user_result = state
            .users_service
            .create_user(&email, &password)
            .await
            .map_err(|e| {
                tracing::error!("Error creating user: {:?}", e);
                internal_server_error("Error creating user.")
            })?;

        let server_response = RegisterResponse::from(create_user_result);

        Ok((StatusCode::CREATED, Json(server_response)))
    }
}
