import { v4 as uuidV4 } from 'uuid';

import UserToken from '../../typeorm/entities/UserToken';
import IUserTokensRepository from '../IUserTokensRepository';

class FakeUserTokensRepository implements IUserTokensRepository {

  private users: UserToken[] = [];

  public async generate(user_id: string): Promise<UserToken> {
    const userToken = new UserToken();

    Object.assign(userToken, {
      id: uuidV4(),
      token: uuidV4(),
      user_id,
      create_at: new Date(),
      update_at: new Date()
    });

    this.users.push(userToken);

    return userToken;
  }

  public async findByToken(token: string): Promise<UserToken | undefined> {
    return this.users.find(findToken => findToken.token === token);
  }

}

export default FakeUserTokensRepository;
