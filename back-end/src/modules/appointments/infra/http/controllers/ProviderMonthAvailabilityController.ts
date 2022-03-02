import ListProviderMonthAvailabilityService from "@modules/appointments/services/ListProviderMonthAvailabilityService";
import { Request, Response } from "express";
import { container } from "tsyringe";

export default class ProviderMonthAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { provider_id } = request.params;
    const { month, yaer } = request.body

    const listProviderMonthAvailability = container.resolve(ListProviderMonthAvailabilityService);

    const availability = await listProviderMonthAvailability.execute({
      provider_id,
      month,
      yaer
    });

    return response.json(availability);
  }
}
