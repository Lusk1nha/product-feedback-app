use std::sync::Arc;

use axum::{
    extract::State,
    http::{HeaderMap, StatusCode},
    response::IntoResponse,
    Json,
};
use axum_extra::extract::CookieJar;

use crate::{
    api_state::AppState,
    http::{
        axum_response::ValidatedJson,
        error_response::ErrorResponse,
        error_types::{bad_request_error, internal_server_error, unauthorized_error},
    },
    libs::{cookie::create_refresh_token_cookie, passwords::verify_hash_password},
    types::auth_types::{
        LoginRequest, LoginResponse, RefreshRequest, RefreshResponse, RegisterRequest,
        RegisterResponse,
    },
};

pub struct AuthController;

impl AuthController {
    /**
     * # Login a user in the system
     * - Check if the user exists
     * - Check if the password is correct
     * - Create a new session
     * - Return the access token
     */
    pub async fn login(
        jar: CookieJar,
        State(state): State<Arc<AppState>>,
        ValidatedJson(payload): ValidatedJson<LoginRequest>,
    ) -> Result<impl IntoResponse, ErrorResponse> {
        let email = payload.email.trim().to_lowercase();
        let password = payload.password;

        tracing::info!("Login attempt for email: {}", email);

        let user = state
            .users_service
            .get_user_by_email(&email)
            .await
            .map_err(|e| {
                tracing::error!("Database error: {:?}", e);
                internal_server_error("Authentication failed")
            })?
            .ok_or_else(|| unauthorized_error("Invalid credentials"))?;

        let is_valid = tokio::task::spawn_blocking(move || {
            verify_hash_password(&password, &user.password_hash)
        })
        .await
        .map_err(|e| {
            tracing::error!("Thread join error: {:?}", e);
            internal_server_error("Authentication failed")
        })?
        .map_err(|e| {
            tracing::error!("Password verification error: {:?}", e);
            internal_server_error("Authentication failed")
        })?;

        if !is_valid {
            return Err(unauthorized_error("Invalid credentials"));
        }

        // Criação de sessão com tratamento de erros
        let session = state
            .session_service
            .create_session(&user.id)
            .await
            .map_err(|e| {
                tracing::error!("Session creation error: {:?}", e);
                internal_server_error("Authentication failed")
            })?;

        let user_id = user.id.clone();
        tokio::spawn(async move {
            if let Err(e) = state.users_service.update_last_login(&user_id).await {
                tracing::error!("Failed to update last login for user {}: {}", &user_id, e);
            }
        });

        // Configuração segura do cookie
        let jar = create_refresh_token_cookie(jar, &session.refresh_token);

        let headers = HeaderMap::new();

        tracing::info!("User {} logged in successfully", user.id);

        Ok((
            StatusCode::OK,
            jar,
            headers,
            Json(LoginResponse {
                access_token: session.access_token,
                expires_in: session.access_expires_at,
            }),
        ))
    }

    /**
     * # Register a new user in the system
     *  - Check if the user already exists
     *  - Create a new user in the database
     *  - Return the user information
     */
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

    /**
     * # Refresh the access token
     * - Check if the refresh token is valid
     * - Create a new session
     * - Return the access token
     */
    pub async fn refresh(
        jar: CookieJar,
        State(state): State<Arc<AppState>>,
        ValidatedJson(payload): ValidatedJson<RefreshRequest>,
    ) -> Result<impl IntoResponse, ErrorResponse> {
        let refresh_token = payload.refresh_token;

        let session = state
            .session_service
            .refresh_session(&refresh_token)
            .await
            .map_err(|e| {
                tracing::error!("Error refreshing session: {:?}", e);
                internal_server_error("Error refreshing session.")
            })?;

        let jar = create_refresh_token_cookie(jar, &session.refresh_token);

        let headers = HeaderMap::new();

        Ok((
            StatusCode::OK,
            jar,
            headers,
            Json(RefreshResponse {
                access_token: session.access_token,
                expires_in: session.access_expires_at,
            }),
        ))
    }
}
