import CreateAppointmentService from './CreateAppointmentService'
import FakesAppointmentsRepository from '../infra/repositories/fakes/FakeAppointmentsRepository';
import AppError from '@shared/errors/AppError';

describe('CreateAppointment', () => {
  it('should be able to create a new appointment', async () => {
    const fakeAppointmentsRepository = new FakesAppointmentsRepository();
    const createAppointment = new CreateAppointmentService(fakeAppointmentsRepository);

    const appointment = await createAppointment.execute({
      date: new Date(),
      provider_id: '123123123'
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('123123123');
  });

  it('should not be able to create a new appointment on the same time', async () => {
    const fakeAppointmentsRepository = new FakesAppointmentsRepository();
    const createAppointment = new CreateAppointmentService(fakeAppointmentsRepository);

    const date = new Date();

    await createAppointment.execute({
      date: date,
      provider_id: '123123123'
    });

    await expect(createAppointment.execute({
      date: date,
      provider_id: '123123123'
    })).rejects.toBeInstanceOf(AppError)
  });
});
