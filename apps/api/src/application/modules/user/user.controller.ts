import { Controller, Get, Inject, Logger } from '@nestjs/common';
import { UserRepository } from 'src/core/domain/repositories/user.repository';
import { FindAllUsersUseCase } from 'src/core/use-cases/find-all-users.usecase';
import { USER_REPOSITORY } from 'src/infra/database/repositories/user.drizzle-repository';

@Controller('users')
export class UserController {
  private readonly logger = new Logger(UserController.name);

  constructor(@Inject(USER_REPOSITORY) private userRepository: UserRepository) {
    this.logger.log('UserController initialized');
  }

  @Get()
  async findAll() {
    const usecase = new FindAllUsersUseCase(this.userRepository);
    return await usecase.execute();
  }
}
