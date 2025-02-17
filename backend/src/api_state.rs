use std::sync::Arc;

use chrono::TimeDelta;

use crate::{
    database::DatabaseApp,
    environment::EnvironmentApp,
    repositories::{session_repository::SessionRepository, users_repository::UsersRepository},
    services::{session_service::SessionService, users_service::UsersService},
};

#[derive(Clone)]
pub struct AppState {
    #[allow(dead_code)]
    pub database: DatabaseApp,
    pub environment: EnvironmentApp,

    pub users_service: Arc<UsersService>,
    pub session_service: Arc<SessionService>,
}

impl AppState {
    pub fn new(
        database: DatabaseApp,
        environment: EnvironmentApp,
    ) -> Result<Arc<Self>, anyhow::Error> {
        let users_repository = UsersRepository::new(database.clone());
        let users_service = UsersService::new(users_repository);

        let session_repository = SessionRepository::new(database.clone());
        let session_service = SessionService::new(
            session_repository,
            TimeDelta::days(7),
            TimeDelta::minutes(15),
            environment.jwt_secret.clone(),
        )?;

        Ok(Arc::new(Self {
            database,
            environment,

            users_service: Arc::new(users_service),
            session_service: Arc::new(session_service),
        }))
    }
}
