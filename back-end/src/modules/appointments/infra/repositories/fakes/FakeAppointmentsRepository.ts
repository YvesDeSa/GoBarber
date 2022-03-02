import { v4 as uuidV4 } from 'uuid';

import IAppointmentsRepository from '../../repositories/IAppintmentsRepository';
import { ICreateAppointmentsDTO } from '@modules/appointments/dtos/ICreateAppointmentsDTO';
import Appointment from '../../typeorm/entities/Appointment';
import { isEqual, getYear, getMonth } from 'date-fns';
import { IFindAllInMonthFromProviderDTO } from '@modules/appointments/dtos/IFindAllInMonthFromProviderDTO';

class FakeAppointmentsRepository implements IAppointmentsRepository {
  private appointments: Appointment[] = [];

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    return this.appointments.find(
      appointment => isEqual(appointment.date, date)
    );
  };

  public async findAllInMonthFromProvider({
    provider_id,
    month,
    yaer
  }: IFindAllInMonthFromProviderDTO): Promise<Appointment[]> {
    return this.appointments.filter(appointment => {
      return (
        appointment.provider_id === provider_id &&
        getMonth(appointment.date) + 1 === month &&
        getYear(appointment.date) === yaer
      );
    });
  };

  public async create({ date, provider_id }: ICreateAppointmentsDTO): Promise<Appointment> {
    const appointment = new Appointment();

    Object.assign(appointment, { id: uuidV4(), date, provider_id });

    this.appointments.push(appointment);

    return appointment;
  };
};

export default FakeAppointmentsRepository;
