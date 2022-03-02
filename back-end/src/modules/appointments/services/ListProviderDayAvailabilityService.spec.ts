import FakeAppointmentsRepository from "../infra/repositories/fakes/FakeAppointmentsRepository";
import ListProviderDayAvailabilityService from "./ListProviderDayAvailabilityService";

let fakeAppoitmentsRepository: FakeAppointmentsRepository;
let listProviderDayAvailability: ListProviderDayAvailabilityService;

describe("listProviderDayAvailability", () => {
  beforeEach(() => {
    fakeAppoitmentsRepository = new FakeAppointmentsRepository();
    listProviderDayAvailability = new ListProviderDayAvailabilityService(
      fakeAppoitmentsRepository
    );
  });

  it("should be able to list the day availability from provider", async () => {
    await fakeAppoitmentsRepository.create({
      provider_id: 'user',
      date: new Date(2022, 2, 2, 8, 0, 0)
    });

    await fakeAppoitmentsRepository.create({
      provider_id: 'user',
      date: new Date(2022, 2, 2, 10, 0, 0)
    });

    const availability = await listProviderDayAvailability.execute({
      provider_id: 'user',
      day: 2,
      month: 3,
      yaer: 2022,
    });

    expect(availability).toEqual(expect.arrayContaining([
      { hour: 8, available: false },
      { hour: 9, available: true },
      { hour: 10, available: false },
      { hour: 11, available: true },
    ]));

  });
});
