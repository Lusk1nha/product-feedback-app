use bcrypt::BcryptError;
use thiserror::Error;

#[derive(Error, Debug)]
pub enum SessionError {
    #[error("Database error: {0}")]
    Database(#[from] sqlx::Error),

    #[error("Hashing error: {0}")]
    Hashing(#[from] BcryptError),

    #[error("Token generation error")]
    TokenGeneration,

    #[error("Invalid configuration")]
    Configuration,

    #[error("Invalid token format")]
    InvalidRefreshToken,

    #[error("Expired refresh token")]
    ExpiredRefreshToken,
}
