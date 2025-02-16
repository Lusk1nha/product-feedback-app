use std::env;

use dotenv::dotenv;

#[derive(Debug, Clone)]
pub struct EnvironmentApp {
    pub database_url: String,
    pub port: u16,

    pub is_prod: bool,

    pub version: String,
}

impl EnvironmentApp {
    pub fn new() -> Self {
        dotenv().ok();

        let database_url = env::var("DATABASE_URL").expect("DATABASE_URL must be set");
        let port = env::var("PORT")
            .unwrap_or_else(|_| "3000".to_string())
            .parse::<u16>()
            .expect("PORT must be a number");

        let environment = env::var("ENVIRONMENT").expect("ENVIRONMENT must be set");

        let version = env::var("VERSION").expect("VERSION must be set");

        Self {
            database_url,
            port,

            is_prod: environment == "production",

            version,
        }
    }
}
