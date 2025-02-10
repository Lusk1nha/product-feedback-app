use chrono::{DateTime, Utc};
use serde::Serialize;
use sqlx::prelude::FromRow;

#[derive(FromRow, Serialize)]
pub struct User {
    pub id: i32,
    pub username: String,
    pub created_at: DateTime<Utc>,
}

pub struct CreateUser {
    pub username: String,
}
