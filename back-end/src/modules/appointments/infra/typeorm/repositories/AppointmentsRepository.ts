import { ICreateAppointmentsDTO } from '@modules/appointments/dtos/ICreateAppointmentsDTO';
import { IFindAllInDayFromProviderDTO } from '@modules/appointments/dtos/IFindAllInDayFromProviderDTO';
import { IFindAllInMonthFromProviderDTO } from '@modules/appointments/dtos/IFindAllInMonthFromProviderDTO';
import { getRepository, Raw, Repository } from 'typeorm';

import IAppointmentsRepository from '../../repositories/IAppintmentsRepository';

import Appointment from '../entities/Appointment';

class AppointmentsRepository implements IAppointmentsRepository {
  private ormRepository: Repository<Appointment>;

  constructor() {
    this.ormRepository = getRepository(Appointment);
  };

  public async findByDate(date: Date, provider_id: string): Promise<Appointment | undefined> {
    const findAppointment = await this.ormRepository.findOne({
      where: { date, provider_id },
    })

    return findAppointment;
  }

  public async findAllInMonthFromProvider({
    provider_id,
    month,
    year
  }: IFindAllInMonthFromProviderDTO): Promise<Appointment[]> {
    const parseMonth = String(month).padStart(2, '0');

    return this.ormRepository.find({
      where: {
        provider_id,
        date: Raw(
          dateFieldName =>
            `to_char(${dateFieldName}, 'MM-YYYY') = '${parseMonth}-${year}'`
        )
      }
    });
  };

  public async findAllInDayFromProvider({
    provider_id,
    day,
    month,
    year
  }: IFindAllInDayFromProviderDTO): Promise<Appointment[]> {
    const parseDay = String(day).padStart(2, '0');
    const parseMonth = String(month).padStart(2, '0');

    return this.ormRepository.find({
      where: {
        provider_id,
        date: Raw(
          dateFieldName =>
            `to_char(${dateFieldName}, 'DD-MM-YYYY') = '${parseDay}-${parseMonth}-${year}'`
        )
      },
      relations: ['user'],
    });
  };

  public async create({ date, provider_id, user_id }: ICreateAppointmentsDTO): Promise<Appointment> {
    const appointment = this.ormRepository.create({ date, provider_id, user_id });

    await this.ormRepository.save(appointment);

    return appointment;
  }
}

export default AppointmentsRepository;
