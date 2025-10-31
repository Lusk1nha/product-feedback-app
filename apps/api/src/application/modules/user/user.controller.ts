import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { FindAllUsersUseCase } from 'src/core/use-cases/find-all-users.usecase';
import { FindByEmailUseCase } from 'src/core/use-cases/find-by-email.usecase';

@Controller('users')
export class UserController {
  constructor(
    private readonly findAllUsersUseCase: FindAllUsersUseCase,
    private readonly findByEmailUseCase: FindByEmailUseCase,
  ) {}

  @Get('/')
  @ApiOperation({ summary: 'Retrieve all users' })
  @ApiResponse({
    status: 200,
    description: 'A list of users has been successfully retrieved.',
  })
  async findAll() {
    return this.findAllUsersUseCase.execute();
  }

  @Get('/:email')
  @ApiOperation({ summary: 'Find user by email' })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully retrieved.',
  })
  async findByEmail(@Param('email') email: string) {
    return this.findByEmailUseCase.execute({ email });
  }
}
