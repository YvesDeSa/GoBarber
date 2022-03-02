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
      user_id: 'user',
      date: new Date(2022, 2, 2, 11, 0, 0)
    });

    await fakeAppoitmentsRepository.create({
      provider_id: 'user',
      user_id: 'user',
      date: new Date(2022, 2, 2, 13, 0, 0)
    });

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2022, 2, 2, 10).getTime();
    });

    const availability = await listProviderDayAvailability.execute({
      provider_id: 'user',
      day: 2,
      month: 3,
      yaer: 2022,
    });

    expect(availability).toEqual(expect.arrayContaining([
      { hour: 10, available: false },
      { hour: 11, available: false },
      { hour: 12, available: true },
      { hour: 13, available: false },
      { hour: 14, available: true },
    ]));

  });
});
