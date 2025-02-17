use chrono::{DateTime, Utc};
use serde::Serialize;
use sqlx::prelude::FromRow;

#[derive(FromRow, Serialize)]
pub struct Session {
    pub id: String,

    pub user_id: String,

    pub access_token: String,
    pub refresh_token_hash: String,

    pub access_expires_at: DateTime<Utc>,
    pub refresh_expires_at: DateTime<Utc>,

    pub is_active: bool,

    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
}

pub struct CreateSession {
    pub id: String,
    pub user_id: String,

    pub access_token: String,
    pub refresh_token_hash: String,

    pub access_expires_at: DateTime<Utc>,
    pub refresh_expires_at: DateTime<Utc>,
}

pub struct UpdateSession {
    pub id: String,
    pub access_token: String,
    pub refresh_token_hash: String,

    pub access_expires_at: DateTime<Utc>,
    pub refresh_expires_at: DateTime<Utc>,

    pub is_active: bool,
}
