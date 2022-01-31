import { getRepository, Repository } from 'typeorm';

import IUserTokensRepository from '../../repositories/IUserTokensRepository';
import UserToken from '../entities/UserToken';

class UsersRepository implements IUserTokensRepository {
  private ormRepository: Repository<UserToken>;

  constructor() {
    this.ormRepository = getRepository(UserToken);
  }

  public async generate(user_id: string): Promise<UserToken> {
    const userToken = this.ormRepository.create({
      user_id
    });

    await this.ormRepository.save(userToken);

    return userToken;
  }

  public async findByToken(token: string): Promise<UserToken | undefined> {
    return await this.ormRepository.findOne({
      where: { token }
    });
  }

}

export default UsersRepository;
