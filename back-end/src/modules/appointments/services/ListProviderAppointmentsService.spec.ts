import FakeCacheProvider from "@shared/container/providers/CacheProvider/fakes/FakeCacheProvider";
import FakeAppointmentsRepository from "../infra/repositories/fakes/FakeAppointmentsRepository";
import ListProviderAppointmentsService from "./ListProviderAppointmentsService";

let fakeAppoitmentsRepository: FakeAppointmentsRepository;
let fakeCacheProvider: FakeCacheProvider;
let listProviderAppointments: ListProviderAppointmentsService;

describe("ListProviderAppointments", () => {
  beforeEach(() => {
    fakeAppoitmentsRepository = new FakeAppointmentsRepository();
    fakeCacheProvider = new FakeCacheProvider();

    listProviderAppointments = new ListProviderAppointmentsService(
      fakeAppoitmentsRepository,
      fakeCacheProvider
    );
  });

  it("should be able to list the appoitment on a speficic day", async () => {
    const appoitment1 = await fakeAppoitmentsRepository.create({
      provider_id: 'provider',
      user_id: 'user',
      date: new Date(2022, 2, 2, 11, 0, 0)
    });

    const appoitment2 = await fakeAppoitmentsRepository.create({
      provider_id: 'provider',
      user_id: 'user',
      date: new Date(2022, 2, 2, 13, 0, 0)
    });

    const appointments = await listProviderAppointments.execute({
      provider_id: 'provider',
      day: 2,
      month: 3,
      year: 2022,
    });

    expect(appointments).toEqual([appoitment1, appoitment2]);

  });
});
