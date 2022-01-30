import { injectable, inject } from 'tsyringe';
import { addHours, differenceInHours, isAfter } from 'date-fns';

import IUsersRepository from '../infra/repositories/IUsersRepository';
import IUserTokensRepository from '../infra/repositories/IUserTokensRepository';
import IHashProviders from '../providers/HashProviders/models/IHashProviders';

import AppError from '@shared/errors/AppError';
// import User from '@modules/users/infra/typeorm/entities/User';

interface IRequest {
  token: string,
  password: string;
}

@injectable()
class ResetPasswordService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('userTokensRepository')
    private userTokensRepository: IUserTokensRepository,

    @inject('HashProvider')
    private hashProvider: IHashProviders,
  ) { }

  public async execute({ password, token }: IRequest): Promise<void> {
    const userToken = await this.userTokensRepository.findByToken(token);

    if (!userToken) {
      throw new AppError('User token does not exists');
    }

    const user = await this.usersRepository.findById(userToken.user_id);

    if (!user) {
      throw new AppError('User does not exists');
    }

    const tokenCreateAt = userToken.create_at;

    if (differenceInHours(new Date(Date.now()), tokenCreateAt) >= 2) {
      throw new AppError('Token expired');
    }

    user.password = await this.hashProvider.generateHash(password);

    await this.usersRepository.save(user);
  }
}

export default ResetPasswordService;
