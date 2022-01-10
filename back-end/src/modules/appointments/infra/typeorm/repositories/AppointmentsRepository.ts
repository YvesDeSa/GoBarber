import { getRepository, Repository } from 'typeorm';

import { IAppointmentsRepository } from '../../repositories/IAppintmentsRepository';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import { ICreateAppointmentsDTO } from '../../dtos/ICreateAppointmentsDTO';

class AppointmentsRepository implements IAppointmentsRepository {
  private ormRepository: Repository<Appointment>;

  constructor() {
    this.ormRepository = getRepository(Appointment);
  };

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = await this.ormRepository.findOne({
      where: { date },
    })

    return findAppointment;
  }

  public async create({ date, provider_id }: ICreateAppointmentsDTO): Promise<Appointment> {
    const appointment = this.ormRepository.create({ date, provider_id });

    await this.ormRepository.save(appointment);

    return appointment;
  }
}

export default AppointmentsRepository;
