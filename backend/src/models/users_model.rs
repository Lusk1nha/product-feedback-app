use chrono::{DateTime, Utc};
use serde::Serialize;
use sqlx::prelude::FromRow;

#[derive(FromRow, Serialize)]
pub struct User {
    pub id: String,

    pub email: String,
    pub password_hash: String,

    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,

    pub last_login_at: Option<DateTime<Utc>>,
    pub is_active: bool,
    pub deleted_at: Option<DateTime<Utc>>,
}

pub struct CreateUser {
    pub id: String,
    pub email: String,
    pub password_hash: String,
}

pub struct UpdateUserCredentials {
    pub id: String,
    pub email: String,
    pub password_hash: String,
}

pub struct UpdateUserLastLogin {
    pub id: String,
    pub last_login_at: DateTime<Utc>,
}

pub struct DeleteUser {
    pub id: String,
    pub is_active: bool,
    pub deleted_at: DateTime<Utc>,
}
