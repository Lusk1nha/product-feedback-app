CREATE TABLE IF NOT EXISTS sessions (
  id BINARY(16) PRIMARY KEY NOT NULL COMMENT 'UUID em formato binário para melhor performance',
  user_id BINARY(16) NOT NULL COMMENT 'ID do usuário',
  access_token VARCHAR(512) NOT NULL COMMENT 'Token de acesso da sessão',
  refresh_token_hash CHAR(64) NOT NULL COMMENT 'Token de atualização da sessão',
  access_expires_at DATETIME NOT NULL COMMENT 'Data e hora de expiração do token de acesso',
  refresh_expires_at DATETIME NOT NULL COMMENT 'Data e hora de expiração do token de atualização',
  is_active BOOLEAN NOT NULL DEFAULT TRUE COMMENT 'Indica se a sessão está ativa',
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Data e hora de criação da sessão',
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Data e hora da última atualização da sessão',
  FOREIGN KEY (user_id) REFERENCES users (id),
  INDEX idx_sessions_user_id (user_id),
  CHECK (is_active IN (0, 1))
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = 'Tabela para armazenar sessões';