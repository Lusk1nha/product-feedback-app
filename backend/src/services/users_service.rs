use bcrypt::DEFAULT_COST;

use crate::{
    libs::{guids::create_uuid_v4, passwords::hash_password},
    models::users_model::{CreateUser, User},
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

    pub async fn get_user_by_email(&self, email: &str) -> Result<Option<User>, sqlx::Error> {
        self.users_repository.get_user_by_email(email).await
    }

    pub async fn create_user(&self, email: &str, password: &str) -> Result<User, sqlx::Error> {
        let id = create_uuid_v4();
        let password_hash = match hash_password(&password, DEFAULT_COST) {
            Ok(hash) => hash,
            Err(e) => {
                return Err(sqlx::Error::Decode(Box::new(e)));
            }
        };

        let create_user = CreateUser {
            id,
            email: email.to_string(),
            password_hash,
        };

        self.users_repository
            .create_user_transaction(&create_user)
            .await
    }
}
