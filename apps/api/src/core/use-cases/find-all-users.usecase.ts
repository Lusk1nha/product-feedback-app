import { UserRepository } from '../domain/repositories/user.repository';

export class FindAllUsersUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute() {
    return this.userRepository.findAll();
  }
}
