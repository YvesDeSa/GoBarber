import AppError from '@shared/errors/AppError';

import CreateAppointmentService from './CreateAppointmentService';

import FakesAppointmentsRepository from '../infra/repositories/fakes/FakeAppointmentsRepository';
import FakesNotificationRepository from '@modules/notifications/repositories/fakes/FakeNotificationRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';

let fakeAppointmentsRepository: FakesAppointmentsRepository;
let fakeNotificationRepository: FakesNotificationRepository;
let fakeCacheProvider: FakeCacheProvider;
let createAppointment: CreateAppointmentService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakesAppointmentsRepository();
    fakeNotificationRepository = new FakesNotificationRepository();
    fakeCacheProvider = new FakeCacheProvider();

    createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
      fakeNotificationRepository,
      fakeCacheProvider
    );
  });

  it('should be able to create a new appointment', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2022, 2, 2, 12).getTime();
    });

    const appointment = await createAppointment.execute({
      date: new Date(2022, 2, 2, 13),
      user_id: 'user-id',
      provider_id: 'provider-id'
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('provider-id');
  });

  it('should not be able to create two appointment on the same time', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2022, 2, 2, 12).getTime();
    });

    await createAppointment.execute({
      date: new Date(2022, 2, 2, 13),
      user_id: 'user-id',
      provider_id: 'provider-id'
    });

    await expect(createAppointment.execute({
      date: new Date(2022, 2, 2, 13),
      user_id: 'user-id',
      provider_id: 'provider-id'
    })).rejects.toBeInstanceOf(AppError)
  });

  it('should not be able to create an appointment on past date', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2022, 2, 2, 12).getTime();
    });

    await expect(createAppointment.execute({
      date: new Date(2022, 2, 2, 11),
      user_id: 'user-id',
      provider_id: 'provider-id'
    })).rejects.toBeInstanceOf(AppError)
  });

  it('should not be able to create an appointment with same user as provider', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2022, 2, 2, 12).getTime();
    });

    await expect(createAppointment.execute({
      date: new Date(2022, 2, 2, 13),
      user_id: 'user-id',
      provider_id: 'user-id'
    })).rejects.toBeInstanceOf(AppError)
  });

  it('should not be able to create an appointment before 8am and after 5pm', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2022, 2, 2, 12).getTime();
    });

    await expect(createAppointment.execute({
      date: new Date(2022, 2, 3, 7),
      user_id: 'user-id',
      provider_id: 'provider-id'
    })).rejects.toBeInstanceOf(AppError)

    await expect(createAppointment.execute({
      date: new Date(2022, 2, 3, 18),
      user_id: 'user-id',
      provider_id: 'provider-id'
    })).rejects.toBeInstanceOf(AppError)
  });
});
