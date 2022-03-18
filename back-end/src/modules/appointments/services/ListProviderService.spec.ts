import FakeUsersRepository from "@modules/users/infra/repositories/fakes/FakeUsersRepository";
import FakeCacheProvider from "@shared/container/providers/CacheProvider/fakes/FakeCacheProvider";
import ListProviderService from "./ListProviderService";

let fakeUsersRepository: FakeUsersRepository;
let fakeCacheProvider: FakeCacheProvider;
let listProfile: ListProviderService;

describe("listProfile", () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeCacheProvider = new FakeCacheProvider();

    listProfile = new ListProviderService(
      fakeUsersRepository,
      fakeCacheProvider
    );
  });

  it("should be able to list the provider", async () => {
    const user1 = await fakeUsersRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "123456",
    });

    const user2 = await fakeUsersRepository.create({
      name: "John Tre",
      email: "johntre@example.com",
      password: "123456",
    });

    const loggerUser = await fakeUsersRepository.create({
      name: "John Qua",
      email: "johnqua@example.com",
      password: "123456",
    });

    const providers = await listProfile.execute({
      user_id: loggerUser.id,
    });

    expect(providers).toEqual([user1, user2]);
  });
});
