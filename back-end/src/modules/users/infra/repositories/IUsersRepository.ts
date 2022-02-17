import ICreateUserDTO from "@modules/users/dtos/ICreateUserDTO";
import IFindAllProviderDTO from "@modules/users/dtos/IFindAllProviderDTO";
import User from "../typeorm/entities/User";

export default interface IUsersRepository {
  findAllProvider(data: IFindAllProviderDTO): Promise<User[]>;
  findById(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  create(data: ICreateUserDTO): Promise<User>;
  save(user: User): Promise<User>;
}
