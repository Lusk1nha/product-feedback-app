use crate::{
    database::DatabaseApp,
    models::messages_model::{CreateMessage, Message},
};

#[derive(Clone)]

pub struct MessagesRepository {
    database: DatabaseApp,
}

const MESSAGE_FIELDS: &str = "id, sender_id, receiver_id, message, created_at";

impl MessagesRepository {
    pub fn new(database: DatabaseApp) -> Self {
        Self { database }
    }

    pub async fn get_messages(&self) -> Result<Vec<Message>, sqlx::Error> {
        let messages =
            sqlx::query_as::<_, Message>(&format!("SELECT {MESSAGE_FIELDS} FROM messages"))
                .fetch_all(&self.database.pool)
                .await?;

        Ok(messages)
    }

    pub async fn create_message_transaction(
        &self,
        message: &CreateMessage,
    ) -> Result<(), sqlx::Error> {
        let mut tx = self.database.pool.begin().await?;

        sqlx::query("INSERT INTO messages (sender_id, receiver_id, message) VALUES (?, ?, ?)")
            .bind(&message.sender_id)
            .bind(&message.receiver_id)
            .bind(&message.message)
            .execute(&mut *tx)
            .await?;

        tx.commit().await?;

        Ok(())
    }
}
