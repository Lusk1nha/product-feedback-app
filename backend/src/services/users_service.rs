use crate::{
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

    pub async fn get_user(&self, id: &i32) -> Result<User, sqlx::Error> {
        self.users_repository.get_user(id).await
    }

    pub async fn create_user(&self, name: &str) -> Result<(), sqlx::Error> {
        let create_user = CreateUser {
            username: name.to_string(),
        };

        self.users_repository
            .create_user_transaction(&create_user)
            .await
    }
}
