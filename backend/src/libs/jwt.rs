use chrono::{DateTime, Utc};
use jsonwebtoken::{decode, encode, DecodingKey, EncodingKey, Header, Validation};
use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Claims {
    pub sub: String,
    pub exp: usize,

    pub iat: usize,
}

pub fn generate_token(
    user_id: &str,
    secret: &str,
    expires_at: &DateTime<Utc>,
) -> Result<String, jsonwebtoken::errors::Error> {
    let expires_at_timestamp = expires_at.timestamp();

    match create_jwt_token(user_id, secret, expires_at_timestamp as usize) {
        Ok(token) => Ok(token),
        Err(e) => Err(e),
    }
}

pub fn create_jwt_token(
    user_id: &str,
    secret: &str,
    exp: usize,
) -> Result<String, jsonwebtoken::errors::Error> {
    let iat = chrono::Utc::now().timestamp() as usize;

    let claims = Claims {
        sub: user_id.to_string(),
        exp,
        iat,
    };

    encode(
        &Header::default(),
        &claims,
        &EncodingKey::from_secret(secret.as_bytes()),
    )
}

pub fn decode_jwt_token(token: &str, secret: &str) -> Result<Claims, jsonwebtoken::errors::Error> {
    decode::<Claims>(
        token,
        &DecodingKey::from_secret(secret.as_bytes()),
        &Validation::default(),
    )
    .map(|data| data.claims)
}
