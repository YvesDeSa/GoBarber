import ICreateNotificationDTO from "../dtos/ICreateNotificarionDTO";
import Notification from "../infra/typeorm/schemas/Notification";

export default interface INotificationRepository {
  create(data: ICreateNotificationDTO): Promise<Notification>;
}
