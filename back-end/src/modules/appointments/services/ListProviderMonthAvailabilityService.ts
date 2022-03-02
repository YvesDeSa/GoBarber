import { injectable, inject } from "tsyringe";

import IAppointmentsRepository from "../infra/repositories/IAppintmentsRepository";
import User from "@modules/users/infra/typeorm/entities/User";
import { getDate, getDaysInMonth } from "date-fns";

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

    const numberOfDaysInMonth = getDaysInMonth(new Date(yaer, month - 1));

    const eachDayArray = Array.from(
      { length: numberOfDaysInMonth },
      (_, index) => index + 1,
    );

    const availability = eachDayArray.map(day => {
      const appointmentsInDay = appointments.filter(appointment => {
        return getDate(appointment.date) === day;
      });

      return {
        day,
        available: appointmentsInDay.length < 10,
      }

    });

    return availability;
  }
}

export default ListProviderMonthAvailabilityService;
