use chrono::{DateTime, TimeDelta, Utc};

use base64::{engine::general_purpose, Engine as _};
use sha2::{Digest, Sha256};

use crate::{
    errors::session_errors::SessionError,
    libs::{guids::create_uuid_v4, jwt::generate_token},
    models::session_model::{CreateSession, Session, UpdateSession},
    repositories::session_repository::SessionRepository,
};

#[derive(Clone)]
pub struct SessionService {
    pub session_repository: SessionRepository,

    refresh_expires: TimeDelta,
    access_expires: TimeDelta,
    token_secret: String,
}

pub struct CreateSessionDto {
    pub refresh_token: String,

    pub access_token: String,
    pub access_expires_at: DateTime<Utc>,
}

impl SessionService {
    pub fn new(
        session_repository: SessionRepository,
        refresh_expires: TimeDelta,
        access_expires: TimeDelta,
        token_secret: String,
    ) -> Result<Self, SessionError> {
        if refresh_expires <= TimeDelta::zero() || access_expires <= TimeDelta::zero() {
            return Err(SessionError::Configuration);
        }

        Ok(Self {
            session_repository,
            refresh_expires,
            access_expires,
            token_secret,
        })
    }

    pub async fn get_session_by_user_id_and_access_token(
        &self,
        user_id: &str,
        token: &str,
    ) -> Result<Option<Session>, SessionError> {
        let now = Utc::now();

        let session = self
            .session_repository
            .get_session_by_user_id_and_access_token(user_id, token)
            .await?
            .filter(|session| session.access_expires_at > now);

        Ok(session)
    }

    pub async fn create_session(&self, user_id: &str) -> Result<CreateSessionDto, SessionError> {
        let id = create_uuid_v4();
        let now = Utc::now();

        // Generate random refresh token
        let refresh_token = self.generate_random_token()?;
        let refresh_token_hash = self.hash_refresh_token(&refresh_token)?;

        // Generate JWT access token
        let access_expires_at = now + self.access_expires;
        let access_token = generate_token(user_id, &self.token_secret, &access_expires_at)
            .map_err(|_| SessionError::TokenGeneration)?;

        let create_session_payload = CreateSession {
            id,
            user_id: user_id.to_string(),
            access_token: access_token.clone(),
            refresh_token_hash,
            access_expires_at,
            refresh_expires_at: now + self.refresh_expires,
        };

        self.session_repository
            .create_session_transaction(&create_session_payload)
            .await?;

        Ok(CreateSessionDto {
            access_token,
            refresh_token,
            access_expires_at,
        })
    }

    pub async fn refresh_session(
        &self,
        refresh_token: &str,
    ) -> Result<CreateSessionDto, SessionError> {
        let now = Utc::now();

        let refresh_token_hash = self.hash_refresh_token(refresh_token)?;

        let session = self
            .session_repository
            .get_session_by_refresh_token(&refresh_token_hash)
            .await?;

        if session.is_none() {
            return Err(SessionError::InvalidRefreshToken);
        }

        let session = session.unwrap();

        if session.refresh_expires_at < now {
            return Err(SessionError::ExpiredRefreshToken);
        }

        let user_id = session.user_id;
        let id = session.id;

        // Generate random refresh token
        let new_refresh_token = self.generate_random_token()?;
        let new_refresh_token_hash = self.hash_refresh_token(&new_refresh_token)?;

        // Generate JWT access token
        let access_expires_at = now + self.access_expires;
        let access_token = generate_token(&user_id, &self.token_secret, &access_expires_at)
            .map_err(|_| SessionError::TokenGeneration)?;

        let create_session_payload = UpdateSession {
            id,
            access_token: access_token.clone(),
            refresh_token_hash: new_refresh_token_hash,
            access_expires_at,
            refresh_expires_at: now + self.refresh_expires,
            is_active: true,
        };

        self.session_repository
            .update_session_transaction(&create_session_payload)
            .await?;

        Ok(CreateSessionDto {
            access_token,
            refresh_token: new_refresh_token,
            access_expires_at,
        })
    }

    fn generate_random_token(&self) -> Result<String, SessionError> {
        use rand::RngCore;

        let mut rng = rand::rng();
        let mut bytes = [0u8; 32];
        rng.fill_bytes(&mut bytes);

        Ok(general_purpose::URL_SAFE_NO_PAD.encode(&bytes))
    }

    fn hash_refresh_token(&self, token: &str) -> Result<String, SessionError> {
        let mut hasher = Sha256::new();
        hasher.update(token.as_bytes());

        let hash = hasher.finalize();
        Ok(general_purpose::URL_SAFE_NO_PAD.encode(hash))
    }
}
