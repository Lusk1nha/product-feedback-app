use bcrypt::DEFAULT_COST;

use crate::{
    errors::user_errors::UserError,
    libs::{guids::create_uuid_v4, passwords::hash_password},
    models::user_model::{CreateUser, User},
    repositories::users_repository::UsersRepository,
};

#[derive(Clone)]
pub struct UsersService {
    pub users_repository: UsersRepository,
}

impl UsersService {
    pub fn new(users_repository: UsersRepository) -> Self {
        Self { users_repository }
    }

    pub async fn get_user_by_email(&self, email: &str) -> Result<Option<User>, UserError> {
        self.users_repository
            .get_user_by_email(email)
            .await
            .map_err(UserError::Database)
    }

    pub async fn create_user(&self, email: &str, password: &str) -> Result<User, UserError> {
        let id = create_uuid_v4();
        let password_hash = hash_password(&password, DEFAULT_COST).map_err(UserError::Password)?;

        let create_user_payload = CreateUser {
            id,
            email: email.to_string(),
            password_hash,
        };

        let user = self
            .users_repository
            .create_user_transaction(&create_user_payload)
            .await
            .map_err(UserError::Database)?;

        Ok(user)
    }

    pub async fn update_last_login(&self, user_id: &str) -> Result<(), UserError> {
        self.users_repository
            .update_last_login_transaction(user_id)
            .await
            .map_err(UserError::Database)?;

        Ok(())
    }
}
