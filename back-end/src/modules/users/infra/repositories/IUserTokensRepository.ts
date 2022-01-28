import UserToken from "../typeorm/entities/UserToken";

export default interface IUserTokensRepository {
  generate(user_id: string): Promise<UserToken>
}
