import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import {
  USER_REPOSITORY,
  UserDrizzleRepository,
} from 'src/infra/database/repositories/user.drizzle-repository';
import { DrizzleModule } from 'src/infra/database/database.module';

@Module({
  imports: [DrizzleModule],
  controllers: [UserController],
  providers: [
    {
      provide: USER_REPOSITORY,
      useClass: UserDrizzleRepository,
    },
  ],
})
export class UserModule {}
