import AppError from '@shared/errors/AppError';
import IUsersRepository from '../infra/repositories/IUsersRepository';
import IHashProviders from '../providers/HashProviders/models/IHashProviders';

import { inject, injectable } from 'tsyringe';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

interface IUserReturn {
  password?: string;
}

@injectable()
class CreateUserService {

  constructor(
    @inject('UsersRepository') private usersRepository: IUsersRepository,
    @inject('HashProvider') private hashProviders: IHashProviders) { }

  public async execute({ name, email, password }: IRequest): Promise<IUserReturn> {

    const checkUserExists = await this.usersRepository.findByEmail(email);

    if (checkUserExists) {
      throw new AppError('Email adrress alredy used');
    }

    const hashedPassword = await this.hashProviders.generateHash(password);

    const user = this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    return user;
  }
}

export default CreateUserService;
