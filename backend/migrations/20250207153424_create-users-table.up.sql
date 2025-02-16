-- Add up migration script here
CREATE TABLE IF NOT EXISTS users (
  id CHAR(36) PRIMARY KEY NOT NULL COMMENT 'UUID em formato binário para melhor performance',
  email VARCHAR(320) NOT NULL UNIQUE COMMENT 'E-mail do usuário',
  password_hash CHAR(60) NOT NULL COMMENT 'Hash da senha do usuário',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT 'Data e hora de criação do usuário',
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Data e hora da última atualização do usuário',
  last_login_at DATETIME DEFAULT NULL COMMENT 'Data e hora do último login do usuário',
  is_active BOOLEAN DEFAULT TRUE COMMENT 'Indica se o usuário está ativo',
  deleted_at DATETIME DEFAULT NULL COMMENT 'Marca se o usuário foi removido (soft delete)',
  CHECK (is_active IN (0, 1))
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = 'Tabela para armazenar usuários';