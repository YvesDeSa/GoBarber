import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '../infra/repositories/IUsersRepository';
import { inject, injectable } from 'tsyringe';

interface Request {
  email: string,
  password: string,
}

interface UserResponse {
  password?: string;
}

interface Response {
  user: UserResponse;
  token: string;
}

@injectable()
class AuthenticateUserService {

  constructor(@inject('UsersRepository') private usersRepository: IUsersRepository) { }

  public async excute({ email, password }: Request): Promise<Response> {

    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Incorrect email/passaword combination', 401);
    }

    const passawordMatched = await compare(password, user.password);

    if (!passawordMatched) {
      throw new AppError('Incorrect email/passaword combination', 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    return {
      user,
      token,
    }
  }
}

export default AuthenticateUserService;
