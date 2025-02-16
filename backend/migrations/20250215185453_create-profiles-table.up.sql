-- Add up migration script here
CREATE TABLE IF NOT EXISTS profiles (
  id CHAR(36) PRIMARY KEY NOT NULL COMMENT 'UUID em formato binário para melhor performance',
  user_id CHAR(36) NOT NULL COMMENT 'Chave estrangeira para a tabela de usuários',
  display_name VARCHAR(255) NOT NULL COMMENT 'Nome de exibição do perfil',
  username VARCHAR(100) NOT NULL COMMENT 'Nome de usuário',
  bio TEXT DEFAULT NULL COMMENT 'Biografia do perfil',
  avatar_url VARCHAR(255) DEFAULT NULL COMMENT 'URL da imagem de avatar do perfil',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT 'Data e hora de criação do perfil',
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Data e hora da última atualização do perfil',
  FOREIGN KEY (user_id) REFERENCES users (id),
  UNIQUE KEY uk_profiles_user_id (user_id),
  UNIQUE KEY uk_profiles_username (username),
  INDEX idx_profiles_user_id (user_id)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = 'Tabela para armazenar perfis';