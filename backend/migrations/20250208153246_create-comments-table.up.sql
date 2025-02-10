CREATE TABLE IF NOT EXISTS comments (
  id BINARY(16) PRIMARY KEY NOT NULL COMMENT 'UUID em formato binário para melhor performance',
  feedback_id BINARY(16) NOT NULL COMMENT 'ID do feedback ao qual o comentário pertence',
  created_by BINARY(16) NOT NULL COMMENT 'ID do usuário que fez o comentário',
  parent_comment_id BINARY(16) DEFAULT NULL COMMENT 'ID do comentário pai (se for uma resposta)',
  content TEXT NOT NULL COMMENT 'Conteúdo do comentário',
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Data e hora de criação do comentário',
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Data e hora da última atualização do comentário',
  FOREIGN KEY (feedback_id) REFERENCES feedbacks (id) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (created_by) REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (parent_comment_id) REFERENCES comments (id) ON DELETE
  SET NULL ON UPDATE CASCADE,
    INDEX idx_comments_feedback_id (feedback_id),
    INDEX idx_comments_user_feedback (created_by, feedback_id),
    INDEX idx_comments_parent_comment (parent_comment_id)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = 'Tabela para armazenar comentários e respostas';