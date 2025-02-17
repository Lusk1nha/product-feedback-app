use thiserror::Error;

#[derive(Error, Debug)]
pub enum UserError {
    #[error("Database error: {0}")]
    Database(#[from] sqlx::Error),

    #[error("Password error: {0}")]
    Password(#[from] bcrypt::BcryptError),
}
