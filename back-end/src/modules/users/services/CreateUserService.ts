import AppError from '@shared/errors/AppError';
import IUsersRepository from '../infra/repositories/IUsersRepository';
import IHashProviders from '../providers/HashProviders/models/IHashProviders';

import { inject, injectable } from 'tsyringe';
import User from '../infra/typeorm/entities/User';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

@injectable()
class CreateUserService {

  constructor(
    @inject('UsersRepository') private usersRepository: IUsersRepository,
    @inject('HashProvider') private hashProviders: IHashProviders,
    @inject('CacheProvider') private cacheProvider: ICacheProvider) { }

  public async execute({ name, email, password }: IRequest): Promise<User> {

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

    await this.cacheProvider.invalidadePrefix('providers-list')

    return user;
  }
}

export default CreateUserService;
