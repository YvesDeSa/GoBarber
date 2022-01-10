import { startOfHour } from 'date-fns';
import { container, inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Appointment from '../infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '../infra/repositories/IAppintmentsRepository';

interface IRequest {
  provider_id: string;
  date: Date;
}

@injectable()
class CreateAppointmentService {

  constructor(@inject('AppointmentsRepository') private appointmentsRepository: IAppointmentsRepository) { }

  public async execute({ date, provider_id }: IRequest): Promise<Appointment> {

    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentInSameDate) {
      throw new AppError('This aappointment is alredy booked');
    }

    const appointment = this.appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
