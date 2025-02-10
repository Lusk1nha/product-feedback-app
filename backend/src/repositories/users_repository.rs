use crate::{
    database::DatabaseApp,
    models::users_model::{CreateUser, User},
};

#[derive(Clone)]

pub struct UsersRepository {
    database: DatabaseApp,
}

const USER_FIELDS: &str = "id, username, created_at";

impl UsersRepository {
    pub fn new(database: DatabaseApp) -> Self {
        Self { database }
    }

    pub async fn get_user(&self, id: &i32) -> Result<User, sqlx::Error> {
        let user =
            sqlx::query_as::<_, User>(&format!("SELECT {USER_FIELDS} FROM users WHERE id = ?"))
                .bind(id)
                .fetch_one(&self.database.pool)
                .await?;

        Ok(user)
    }

    pub async fn create_user_transaction(&self, user: &CreateUser) -> Result<(), sqlx::Error> {
        let mut tx = self.database.pool.begin().await?;

        sqlx::query("INSERT INTO users (name) VALUES (?)")
            .bind(&user.username)
            .execute(&mut *tx)
            .await?;

        tx.commit().await?;

        Ok(())
    }
}
