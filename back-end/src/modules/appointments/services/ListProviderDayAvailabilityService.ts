import { injectable, inject } from "tsyringe";

import IAppointmentsRepository from "../infra/repositories/IAppintmentsRepository";
import { getHours } from "date-fns";

interface IRequest {
  provider_id: string;
  month: number,
  yaer: number,
  day: number,
};

type IResponse = Array<{
  hour: number,
  available: boolean,
}>;

@injectable()
class ListProviderMonthAvailabilityService {
  constructor(
    @inject('AppointmentRepository')
    private appintmentsRepository: IAppointmentsRepository
  ) { }

  public async execute({ provider_id, month, yaer, day }: IRequest): Promise<IResponse> {
    const appointments = await this.appintmentsRepository.findAllInDayFromProvider({
      provider_id,
      day,
      month,
      yaer
    });

    const hourStart = 8;

    const eachHourArray = Array.from(
      { length: 10 },
      (_, index) => index + hourStart,
    );

    const availability = eachHourArray.map(hour => {
      const hasAppointmentInHour = appointments.find(
        appointment => getHours(appointment.date) === hour
      );

      return {
        hour,
        available: !hasAppointmentInHour,
      };

    });


    return availability;
  }
}

export default ListProviderMonthAvailabilityService;
