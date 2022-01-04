import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';

import AppError from '@shared/errors/AppError';
import User from '@modules/users/infra/typeorm/entities/User';

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

class AuthenticateUserService {
  public async excute({ email, password }: Request): Promise<Response> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({
      where: { email }
    });

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
