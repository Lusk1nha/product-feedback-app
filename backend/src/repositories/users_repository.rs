use crate::{
    database::DatabaseApp,
    models::users_model::{CreateUser, User},
};

#[derive(Clone)]

pub struct UsersRepository {
    database: DatabaseApp,
}

const USER_FIELDS: &str =
    "id, email, password_hash, created_at, updated_at, last_login_at, is_active, deleted_at";

impl UsersRepository {
    pub fn new(database: DatabaseApp) -> Self {
        Self { database }
    }

    pub async fn get_user_by_email(&self, email: &str) -> Result<Option<User>, sqlx::Error> {
        let user: Option<User> =
            sqlx::query_as::<_, User>(&format!("SELECT {USER_FIELDS} FROM users WHERE email = ?"))
                .bind(email)
                .fetch_optional(&self.database.pool)
                .await?;

        Ok(user)
    }

    pub async fn create_user_transaction(
        &self,
        create_user: &CreateUser,
    ) -> Result<User, sqlx::Error> {
        let mut tx = self.database.pool.begin().await?;

        sqlx::query("INSERT INTO users (id, email, password_hash) VALUES (?,?,?)")
            .bind(&create_user.id)
            .bind(&create_user.email)
            .bind(&create_user.password_hash)
            .execute(&mut *tx)
            .await?;

        let user: User = sqlx::query_as::<_, User>(&format!(
            "SELECT {USER_FIELDS} FROM users WHERE id = ?"
        ))
        .bind(&create_user.id)
        .fetch_one(&mut *tx)
        .await?;

        tx.commit().await?;

        Ok(user)
    }
}
