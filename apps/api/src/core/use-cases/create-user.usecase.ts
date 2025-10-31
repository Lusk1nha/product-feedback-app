import { Inject, Injectable } from '@nestjs/common';
import { User } from '../domain/entities/user.entity';
import { IUserRepository } from '../domain/repositories/user.repository';
import { USER_REPOSITORY } from 'src/infra/database/repositories/user.drizzle-repository';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: IUserRepository,
  ) {}

  async execute(user: User) {
    return await this.userRepository.create(user);
  }
}
