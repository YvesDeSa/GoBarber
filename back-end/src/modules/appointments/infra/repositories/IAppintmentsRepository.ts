import { ICreateAppointmentsDTO } from '@modules/appointments/dtos/ICreateAppointmentsDTO';
import Appointment from "../typeorm/entities/Appointment";

export default interface IAppointmentsRepository {
  create(data: ICreateAppointmentsDTO): Promise<Appointment>
  findByDate(date: Date): Promise<Appointment | undefined>;
}
