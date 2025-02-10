use std::sync::Arc;

use crate::{
    database::DatabaseApp,
    environment::EnvironmentApp,
    repositories::{messages_repository::MessagesRepository, users_repository::UsersRepository},
    services::{messages_service::MessagesService, users_service::UsersService},
};

#[derive(Clone)]
pub struct AppState {
    pub database: DatabaseApp,
    pub environment: EnvironmentApp,

    pub users_service: Arc<UsersService>,
    pub messages_service: Arc<MessagesService>,
}

impl AppState {
    pub fn new(database: DatabaseApp, environment: EnvironmentApp) -> Arc<Self> {
        let users_repository = UsersRepository::new(database.clone());
        let users_service = UsersService::new(users_repository);

        let messages_repository = MessagesRepository::new(database.clone());
        let messages_service = MessagesService::new(messages_repository);

        Arc::new(Self {
            database,
            environment,

            users_service: Arc::new(users_service),
            messages_service: Arc::new(messages_service),
        })
    }
}
