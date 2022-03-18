import { injectable, inject } from "tsyringe";

import IAppointmentsRepository from "../infra/repositories/IAppintmentsRepository";
import ICacheProvider from "@shared/container/providers/CacheProvider/models/ICacheProvider";
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
    private appintmentsRepository: IAppointmentsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider
  ) { }

  public async execute({ provider_id, month, year, day }: IRequest): Promise<Appointment[]> {
    const cacheKey = `providers-appointments:${provider_id}:${year}-${month}-${day}`;

    let appointments = await this.cacheProvider.recover<Appointment[]>(
      cacheKey,
    );

    if (!appointments) {
      appointments = await this.appintmentsRepository.findAllInDayFromProvider({
        provider_id,
        day,
        month,
        year
      });

      await this.cacheProvider.save(cacheKey, appointments);
    }

    return appointments;
  }
}

export default ListProviderAppointmentsService;
