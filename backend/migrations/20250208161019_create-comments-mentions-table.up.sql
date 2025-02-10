-- Add up migration script here
CREATE TABLE IF NOT EXISTS comment_mentions (
  id BINARY(16) PRIMARY KEY NOT NULL COMMENT 'UUID em formato binário para melhor performance',
  comment_id BINARY(16) NOT NULL COMMENT 'ID do comentário onde a menção foi feita',
  mentioned_user_id BINARY(16) NOT NULL COMMENT 'ID do usuário mencionado',
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Data e hora da menção',
  FOREIGN KEY (comment_id) REFERENCES comments (id) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (mentioned_user_id) REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE,
  INDEX idx_comment_mentions_comment (comment_id),
  INDEX idx_comment_mentions_user (mentioned_user_id)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = 'Tabela para armazenar menções em comentários';