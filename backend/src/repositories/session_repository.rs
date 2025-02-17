use crate::{
    database::DatabaseApp,
    models::session_model::{CreateSession, Session, UpdateSession},
};

#[derive(Clone)]
pub struct SessionRepository {
    database: DatabaseApp,
}

const SESSION_FIELDS: &str = "id, user_id, access_token, refresh_token_hash, access_expires_at, refresh_expires_at, is_active, created_at, updated_at";

impl SessionRepository {
    pub fn new(database: DatabaseApp) -> Self {
        Self { database }
    }

    pub async fn get_session_by_refresh_token(
        &self,
        refresh_token: &str,
    ) -> Result<Option<Session>, sqlx::Error> {
        let session: Option<Session> = sqlx::query_as::<_, Session>(&format!(
            "SELECT {SESSION_FIELDS} FROM sessions WHERE refresh_token_hash = ? AND is_active = 1"
        ))
        .bind(refresh_token)
        .fetch_optional(&self.database.pool)
        .await?;

        Ok(session)
    }

    pub async fn get_session_by_user_id_and_access_token(
        &self,
        user_id: &str,
        access_token: &str,
    ) -> Result<Option<Session>, sqlx::Error> {
        let session: Option<Session> = sqlx::query_as::<_, Session>(&format!(
            "SELECT {SESSION_FIELDS} FROM sessions WHERE user_id = ? AND access_token = ? AND is_active = 1"
        ))
        .bind(user_id)
        .bind(access_token)
        .fetch_optional(&self.database.pool)
        .await?;

        Ok(session)
    }

    pub async fn create_session_transaction(
        &self,
        create_session: &CreateSession,
    ) -> Result<Session, sqlx::Error> {
        let mut tx = self.database.pool.begin().await?;

        sqlx::query("INSERT INTO sessions (id, user_id, access_token, refresh_token_hash, access_expires_at, refresh_expires_at) VALUES (?,?,?,?,?,?)")
            .bind(&create_session.id)
            .bind(&create_session.user_id)
            .bind(&create_session.access_token)
            .bind(&create_session.refresh_token_hash)
            .bind(&create_session.access_expires_at)
            .bind(&create_session.refresh_expires_at)
            .execute(&mut *tx)
            .await?;

        let session: Session = sqlx::query_as::<_, Session>(&format!(
            "SELECT {SESSION_FIELDS} FROM sessions WHERE id = ?"
        ))
        .bind(&create_session.id)
        .fetch_one(&mut *tx)
        .await?;

        tx.commit().await?;

        Ok(session)
    }

    pub async fn update_session_transaction(
        &self,
        update_session: &UpdateSession,
    ) -> Result<Session, sqlx::Error> {
        let mut tx = self.database.pool.begin().await?;

        sqlx::query("UPDATE sessions SET access_token = ?, refresh_token_hash = ?, access_expires_at = ?, refresh_expires_at = ? WHERE id = ?")
            .bind(&update_session.access_token)
            .bind(&update_session.refresh_token_hash)
            .bind(&update_session.access_expires_at)
            .bind(&update_session.refresh_expires_at)
            .bind(&update_session.id)
            .execute(&mut *tx)
            .await?;

        let session: Session = sqlx::query_as::<_, Session>(&format!(
            "SELECT {SESSION_FIELDS} FROM sessions WHERE id = ?"
        ))
        .bind(&update_session.id)
        .fetch_one(&mut *tx)
        .await?;

        tx.commit().await?;

        Ok(session)
    }
}
