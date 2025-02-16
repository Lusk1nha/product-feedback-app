CREATE TABLE IF NOT EXISTS feedbacks (
  id CHAR(36) PRIMARY KEY NOT NULL COMMENT 'UUID em formato binário para melhor performance',
  title VARCHAR(255) NOT NULL COMMENT 'Título do feedback',
  content TEXT NOT NULL COMMENT 'Conteúdo do feedback',
  created_by CHAR(36) NOT NULL COMMENT 'ID do usuário que fez o feedback',
  category_id INT NOT NULL COMMENT 'ID da categoria associada ao feedback',
  status ENUM('Planned', 'In-Progress', 'Live') NOT NULL DEFAULT 'Planned' COMMENT 'Status do feedback',
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Data e hora de criação do feedback',
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Data e hora da última atualização do feedback',
  UNIQUE KEY unique_title_per_user (title, created_by),
  FOREIGN KEY (category_id) REFERENCES categories (id) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (created_by) REFERENCES users (id),
  INDEX idx_feedbacks_category_id (category_id),
  INDEX idx_feedbacks_created_by (created_by, title),
  CHECK (status IN ('Planned', 'In-Progress', 'Live'))
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = 'Tabela para armazenar feedbacks';