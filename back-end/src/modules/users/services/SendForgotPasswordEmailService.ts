import { injectable, inject } from 'tsyringe';

import IMailProvider from '@shared/container/providers/MailProviders/models/IMailProvider';
import IUsersRepository from '../infra/repositories/IUsersRepository';

// import AppError from '@shared/errors/AppError';
// import User from '@modules/users/infra/typeorm/entities/User';

interface IRequest {
  email: string;
}

@injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,
  ) { }

  public async execute({ email }: IRequest): Promise<void> {
    this.mailProvider.sendMail(
      email,
      'Pedido de recuperação de senha recebido',
    );
  }
}

export default SendForgotPasswordEmailService;
