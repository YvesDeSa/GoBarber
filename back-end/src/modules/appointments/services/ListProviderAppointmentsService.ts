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

    const cacheData = await this.cacheProvider.recover('aye');
    console.log(cacheData);

    const appointments = await this.appintmentsRepository.findAllInDayFromProvider({
      provider_id,
      day,
      month,
      year
    });

    // await this.cacheProvider.save('aye', 'aye');

    return appointments;
  }
}

export default ListProviderAppointmentsService;
