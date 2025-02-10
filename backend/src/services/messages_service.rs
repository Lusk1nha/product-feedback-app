use crate::{models::messages_model::{CreateMessage, Message}, repositories::messages_repository::MessagesRepository};

#[derive(Clone)]

pub struct MessagesService {
    pub messages_repository: MessagesRepository,
}

impl MessagesService {
    pub fn new(messages_repository: MessagesRepository) -> Self {
        Self { messages_repository }
    }

    pub async fn get_messages(&self) -> Result<Vec<Message>, sqlx::Error> {
        self.messages_repository.get_messages().await
    }

    pub async fn create_message(&self, message: &CreateMessage) -> Result<(), sqlx::Error> {
        self.messages_repository.create_message_transaction(message).await
    }
}
