import path from 'path';
import fs from 'fs';

import AppError from '@shared/errors/AppError';

import uploadConfig from '@config/upload';
import IUsersRepository from '../infra/repositories/IUsersRepository';
import { inject, injectable } from 'tsyringe';

interface Request {
  user_id: string;
  avatarFileName: string | any;
}

interface UserReturn {
  password?: string;
}

@injectable()
class UpdateUserAvatarService {

  constructor(@inject('UsersRepository') private usersRepository: IUsersRepository) { }

  public async execute({ user_id, avatarFileName }: Request): Promise<UserReturn> {

    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('Only authenticated users can change avatar.');
    }

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.derectory, user.avatar);

      await fs.promises.stat(userAvatarFilePath) && fs.promises.unlink(userAvatarFilePath);
    }

    user.avatar = avatarFileName;

    await this.usersRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
