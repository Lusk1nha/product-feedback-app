use std::sync::Arc;

use crate::{
    database::DatabaseApp, environment::EnvironmentApp,
    repositories::users_repository::UsersRepository, services::users_service::UsersService,
};

#[derive(Clone)]
pub struct AppState {
    pub database: DatabaseApp,
    pub environment: EnvironmentApp,

    pub users_service: Arc<UsersService>,
}

impl AppState {
    pub fn new(database: DatabaseApp, environment: EnvironmentApp) -> Arc<Self> {
        let users_repository = UsersRepository::new(database.clone());
        let users_service = UsersService::new(users_repository);

        Arc::new(Self {
            database,
            environment,

            users_service: Arc::new(users_service),
        })
    }
}
