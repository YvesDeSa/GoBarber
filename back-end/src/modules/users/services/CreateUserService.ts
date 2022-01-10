import { hash } from 'bcryptjs';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '../infra/repositories/IUsersRepository';

import { inject, injectable } from 'tsyringe';

interface Request {
  name: string;
  email: string;
  password: string;
}

interface UserReturn {
  password?: string;
}

@injectable()
class CreateUserService {

  constructor(@inject('UsersRepository') private usersRepository: IUsersRepository) { }

  public async execute({ name, email, password }: Request): Promise<UserReturn> {

    const checkUserExists = await this.usersRepository.findByEmail(email);

    if (checkUserExists) {
      throw new AppError('Email adrress alredy used');
    }

    const hashedPassword = await hash(password, 8);

    const user = this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    return user;
  }
}

export default CreateUserService;
