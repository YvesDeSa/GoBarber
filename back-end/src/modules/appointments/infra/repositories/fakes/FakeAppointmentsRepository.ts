import { v4 as uuidV4 } from 'uuid';

import IAppointmentsRepository from '../../repositories/IAppintmentsRepository';
import { ICreateAppointmentsDTO } from '@modules/appointments/dtos/ICreateAppointmentsDTO';
import Appointment from '../../typeorm/entities/Appointment';
import { isEqual } from 'date-fns';

class AppointmentsRepository implements IAppointmentsRepository {
  private appointments: Appointment[] = [];

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    return this.appointments.find(
      appointment => isEqual(appointment.date, date)
    );
  };

  public async create({ date, provider_id }: ICreateAppointmentsDTO): Promise<Appointment> {
    const appointment = new Appointment();

    Object.assign(appointment, { id: uuidV4(), date, provider_id });

    this.appointments.push(appointment);

    return appointment;
  };
};

export default AppointmentsRepository;
