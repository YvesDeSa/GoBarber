import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import User from '../models/User';

interface Request {
  email: string,
  password: string,
}

interface UserResponse {
  name: string;
  email: string;
  password?: string;
}

interface Response {
  user: UserResponse;
  token: string;
}

class AuthenticateUserService {
  public async excute({email, password}: Request): Promise<Response>{
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({
      where: {email}
    });

    if(!user){
      throw new Error('Incorrect email/passaword combination');
    }

    const passawordMatched = await  compare(password, user.password);

    if(!passawordMatched){
      throw new Error('Incorrect email/passaword combination');
    }

    const token = sign({}, 'as75absd88daboHDp9d7',{
      subject: user.id,
      expiresIn: '1d',
    });

    return {
      user,
      token,
    }
  }
}

export default AuthenticateUserService;
