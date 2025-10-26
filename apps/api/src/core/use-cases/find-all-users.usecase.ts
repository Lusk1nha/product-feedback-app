import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from '../domain/repositories/user.repository';
import { USER_REPOSITORY } from 'src/infra/database/repositories/user.drizzle-repository';

@Injectable()
export class FindAllUsersUseCase {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: UserRepository,
  ) {}

  async execute() {
    return this.userRepository.findAll();
  }
}
