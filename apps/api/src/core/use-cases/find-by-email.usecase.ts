import { Inject, Injectable } from '@nestjs/common';
import { USER_REPOSITORY } from 'src/infra/database/repositories/user.drizzle-repository';
import { IUserRepository } from '../domain/repositories/user.repository';
import { Email } from '../domain/value-objects/email.vo';
import { NotFoundError } from '../errors/not-found.error';

@Injectable()
export class FindByEmailUseCase {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: IUserRepository,
  ) {}

  async execute({ email }: { email: string }) {
    const emailVo = Email.from(email);
    const user = await this.userRepository.findByEmail(emailVo);

    if (!user) {
      throw new NotFoundError('USER', email);
    }

    return user;
  }
}
