use chrono::{DateTime, Utc};
use serde::Serialize;
use sqlx::prelude::FromRow;

#[derive(FromRow, Serialize)]
pub struct Message {
    pub id: i32,

    pub sender_id: i32,
    pub receiver_id: i32,

    pub message: String,
    pub created_at: DateTime<Utc>,
}

pub struct CreateMessage {
    pub sender_id: i32,
    pub receiver_id: i32,
    pub message: String,
}
