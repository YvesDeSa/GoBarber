import AppError from '@shared/errors/AppError';

import IUsersRepository from '../infra/repositories/IUsersRepository';
import { inject, injectable } from 'tsyringe';
import IStorageProvider from '@shared/container/providers/StorageProviders/models/IStorageProvaider';

interface IRequest {
  user_id: string;
  avatarFileName: string | any;
}

interface IUserReturn {
  password?: string;
}

@injectable()
class UpdateUserAvatarService {

  constructor(
    @inject('UsersRepository') private usersRepository: IUsersRepository,
    @inject('StorageProvider') private storageProvider: IStorageProvider
  ) { }

  public async execute({ user_id, avatarFileName }: IRequest): Promise<IUserReturn> {

    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('Only authenticated users can change avatar.');
    }

    if (user.avatar) {
      await this.storageProvider.deleteFile(user.avatar);
    }

    const filename = await this.storageProvider.saveFile(avatarFileName);

    user.avatar = filename;

    await this.usersRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
