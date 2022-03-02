import { injectable, inject } from "tsyringe";

import IAppointmentsRepository from "../infra/repositories/IAppintmentsRepository";
import Appointment from "../infra/typeorm/entities/Appointment";

interface IRequest {
  provider_id: string;
  month: number,
  year: number,
  day: number,
};

@injectable()
class ListProviderAppointmentsService {
  constructor(
    @inject('AppointmentsRepository')
    private appintmentsRepository: IAppointmentsRepository
  ) { }

  public async execute({ provider_id, month, year, day }: IRequest): Promise<Appointment[]> {
    const appointments = await this.appintmentsRepository.findAllInDayFromProvider({
      provider_id,
      day,
      month,
      year
    });

    console.log(appointments)

    return appointments;
  }
}

export default ListProviderAppointmentsService;
