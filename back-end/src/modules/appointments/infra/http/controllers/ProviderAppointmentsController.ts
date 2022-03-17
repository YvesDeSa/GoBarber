import ListProviderAppointmentsService from "@modules/appointments/services/ListProviderAppointmentsService";
import { Request, Response } from "express";
import { container } from "tsyringe";

export default class ProviderAppointmentsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const provider_id = request.user.id;
    const { day, month, year } = request.query;

    const providerAppointments = container.resolve(ListProviderAppointmentsService);

    const appointments = await providerAppointments.execute({
      provider_id,
      year: Number(year),
      month: Number(month),
      day: Number(day),
    });

    return response.json(appointments);
  }
}
