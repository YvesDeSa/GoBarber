import { v4 as uuidV4 } from 'uuid';

import User from '@modules/users/infra/typeorm/entities/User';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IUsersRepository from '../../repositories/IUsersRepository';
import IFindAllProviderDTO from '@modules/users/dtos/IFindAllProviderDTO';

class FakeUsersRepository implements IUsersRepository {
  private users: User[] = [];

  public async findById(id: string): Promise<User | undefined> {
    return this.users.find(user => user.id === id);
  }

  public async findAllProvider({ except_user_id }: IFindAllProviderDTO): Promise<User[]> {
    let { users } = this;

    if (except_user_id) {
      users = this.users.filter(user => user.id !== except_user_id);
    }

    return users;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    return this.users.find(user => user.email === email);
  }

  public async create(userData: ICreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, { id: uuidV4() }, userData);

    this.users.push(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    const findIndex = this.users.findIndex(findUser => findUser.id === user.id);

    this.users[findIndex] = user;

    return user;
  }
}

export default FakeUsersRepository;
