import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../infra/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProviders/fakes/FakeHashProviders';
import CreateUserService from './CreateUserService';

describe('CreateUser', () => {
  it('should be able to create a new user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);

    const user = await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '1234'
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a new user with same email from another', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);

    const email = 'johndoe@example.com';

    await createUser.execute({
      name: 'John Doe',
      email: email,
      password: '1234'
    });

    await expect(createUser.execute({
      name: 'John Hart',
      email: email,
      password: 'abcd'
    })).rejects.toBeInstanceOf(AppError);
  });
});
