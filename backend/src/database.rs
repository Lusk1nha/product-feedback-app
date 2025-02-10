use sqlx::{migrate::Migrator, MySql, MySqlPool, Pool};

use crate::environment::EnvironmentApp;

#[derive(Debug, Clone)]
pub struct DatabaseApp {
    pub pool: Pool<MySql>,
}

impl DatabaseApp {
    pub async fn new(environment: &EnvironmentApp) -> Result<Self, sqlx::Error> {
        let url = &environment.database_url;

        let pool = Self::create_pool(&url).await?;

        Ok(Self { pool })
    }

    pub async fn run_migrations(&self) -> Result<(), sqlx::Error> {
        const MIGRATIONS_DIR: &str = "migrations";

        let directory = std::path::Path::new(MIGRATIONS_DIR);

        if !directory.exists() {
            return Err(sqlx::Error::Configuration(
                format!("Migrations directory '{}' does not exist", MIGRATIONS_DIR).into(),
            ));
        }

        let migrator = Migrator::new(directory).await?;

        migrator.run(&self.pool).await?;

        Ok(())
    }

    pub async fn create_pool(url: &str) -> Result<Pool<MySql>, sqlx::Error> {
        MySqlPool::connect(url).await
    }

    pub async fn close_pool(&self) -> Result<(), sqlx::Error> {
        Ok(self.pool.close().await)
    }
}

impl Drop for DatabaseApp {
    fn drop(&mut self) {
        let pool = self.pool.clone();
        tokio::spawn(async move {
            pool.close().await;
            tracing::info!("Database connection pool closed");
        });
    }
}
