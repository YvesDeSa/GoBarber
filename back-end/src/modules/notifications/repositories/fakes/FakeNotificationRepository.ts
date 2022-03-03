import { ObjectId } from 'mongodb';

import INotificationRepository from '@modules/notifications/repositories/INotificationRepository';
import ICreateNotificationDTO from '@modules/notifications/dtos/ICreateNotificarionDTO';

import Notification from '../../infra/typeorm/schemas/Notification';

class FakeNotificationRepository implements INotificationRepository {
  private notifications: Notification[] = [];

  public async create({ content, recipient_id }: ICreateNotificationDTO): Promise<Notification> {
    const notification = new Notification();

    Object.assign(notification, {
      id: new ObjectId(),
      content,
      recipient_id
    })

    return notification;
  }
}

export default FakeNotificationRepository;
