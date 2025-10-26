import { Controller, Get, Logger } from '@nestjs/common';
import { FindAllUsersUseCase } from 'src/core/use-cases/find-all-users.usecase';

@Controller('users')
export class UserController {
  constructor(private readonly findAllUsersUseCase: FindAllUsersUseCase) {}

  @Get()
  async findAll() {
    return await this.findAllUsersUseCase.execute();
  }
}
