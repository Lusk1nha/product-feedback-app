import { DomainBaseError } from "./domain-base.error";

export class InvalidUsernameError extends DomainBaseError<{ username: string }> {
  constructor(username: string) {
    super(
      'INVALID_USERNAME', // Código do erro
      `Username must have at least 3 characters: ${username}`, // Mensagem legível
      { username }, // Detalhes adicionais
    );
  }
}
