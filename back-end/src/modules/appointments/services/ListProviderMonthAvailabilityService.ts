import { injectable, inject } from "tsyringe";

import IAppointmentsRepository from "../infra/repositories/IAppintmentsRepository";
import User from "@modules/users/infra/typeorm/entities/User";

interface IRequest {
  provider_id: string;
  month: number,
  yaer: number,
};

type IResponse = Array<{
  day: number,
  available: boolean,
}>;

@injectable()
class ListProviderMonthAvailabilityService {
  constructor(
    @inject('AppointmentRepository')
    private appintmentsRepository: IAppointmentsRepository
  ) { }

  public async execute({ provider_id, month, yaer }: IRequest): Promise<IResponse> {
    const appointments = await this.appintmentsRepository.findAllInMonthFromProvider({
      provider_id,
      month,
      yaer
    });

    console.log(appointments);

    return [{ day: 1, available: true }];
  }
}

export default ListProviderMonthAvailabilityService;
