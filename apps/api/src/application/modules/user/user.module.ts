import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import {
  USER_REPOSITORY,
  UserDrizzleRepository,
} from 'src/infra/database/repositories/user.drizzle-repository';
import { DrizzleModule } from 'src/infra/database/database.module';
import { FindAllUsersUseCase } from 'src/core/use-cases/find-all-users.usecase';
import { CreateUserUseCase } from 'src/core/use-cases/create-user.usecase';
import { FindByEmailUseCase } from 'src/core/use-cases/find-by-email.usecase';

@Module({
  imports: [DrizzleModule],
  controllers: [UserController],
  providers: [
    {
      provide: USER_REPOSITORY,
      useClass: UserDrizzleRepository,
    },
    FindAllUsersUseCase,
    FindByEmailUseCase,
    CreateUserUseCase,
  ],
})
export class UserModule {}
