import { ICreateAppointmentsDTO } from '@modules/appointments/dtos/ICreateAppointmentsDTO';
import { IFindAllInMonthFromProviderDTO } from '@modules/appointments/dtos/IFindAllInMonthFromProviderDTO';
import Appointment from "../typeorm/entities/Appointment";

export default interface IAppointmentsRepository {
  create(data: ICreateAppointmentsDTO): Promise<Appointment>
  findByDate(date: Date): Promise<Appointment | undefined>;
  findAllInMonthFromProvider(
    date: IFindAllInMonthFromProviderDTO
  ): Promise<Appointment[]>;
}
