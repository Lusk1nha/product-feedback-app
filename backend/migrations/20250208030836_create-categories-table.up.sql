-- Add up migration script here
CREATE TABLE IF NOT EXISTS categories (
  id INT PRIMARY KEY AUTO_INCREMENT COMMENT 'ID da categoria',
  name VARCHAR(100) NOT NULL UNIQUE COMMENT 'Nome da categoria',
  is_active BOOLEAN NOT NULL DEFAULT TRUE COMMENT 'Indica se a categoria está ativa',
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Data e hora de criação da categoria',
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Data e hora da última atualização da categoria',
  CHECK (is_active IN (0,1))
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = 'Tabela para armazenar categorias';
