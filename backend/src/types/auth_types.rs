use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};
use validator::Validate;

use crate::models::user_model::User;

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

#[derive(Serialize)]
pub struct LoginResponse {
    #[serde(rename = "accessToken")]
    pub access_token: String,
    #[serde(rename = "expiresIn")]
    pub expires_in: DateTime<Utc>,
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

#[derive(Deserialize, Validate)]
pub struct RefreshRequest {
    #[serde(rename = "refreshToken")]
    #[validate(length(min = 1, message = "Refresh token is required"))]
    pub refresh_token: String,
}

#[derive(Serialize)]
pub struct RefreshResponse {
    #[serde(rename = "accessToken")]
    pub access_token: String,
    #[serde(rename = "expiresIn")]
    pub expires_in: DateTime<Utc>,
}
