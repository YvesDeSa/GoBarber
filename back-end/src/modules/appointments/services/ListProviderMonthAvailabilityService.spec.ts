import FakeAppointmentsRepository from "../infra/repositories/fakes/FakeAppointmentsRepository";
import ListProviderMonthAvailabilityService from "./ListProviderMonthAvailabilityService";

let fakeAppoitmentsRepository: FakeAppointmentsRepository;
let listProviderMonthAvailability: ListProviderMonthAvailabilityService;

describe("listProviderMonthAvailability", () => {
  beforeEach(() => {
    fakeAppoitmentsRepository = new FakeAppointmentsRepository();
    listProviderMonthAvailability = new ListProviderMonthAvailabilityService(
      fakeAppoitmentsRepository
    );
  });

  it("should be able to list the month availability from provider", async () => {
    await fakeAppoitmentsRepository.create({
      provider_id: 'user',
      date: new Date(2022, 2, 2, 8, 0, 0)
    });

    await fakeAppoitmentsRepository.create({
      provider_id: 'user',
      date: new Date(2022, 2, 2, 10, 0, 0)
    });

    await fakeAppoitmentsRepository.create({
      provider_id: 'user',
      date: new Date(2022, 2, 3, 8, 0, 0)
    });

    const availability = await listProviderMonthAvailability.execute({
      provider_id: 'user',
      month: 3,
      yaer: 2022,
    });

    expect(availability).toEqual(expect.arrayContaining([
      { day: 1, available: true },
      { day: 2, available: false },
      { day: 3, available: false },
      { day: 4, available: true }
    ]));

  });
});
