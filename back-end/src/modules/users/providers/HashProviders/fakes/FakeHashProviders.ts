import IHashProviders from "../models/IHashProviders";

class FakeHashProvider implements IHashProviders {
  public async generateHash(payload: string): Promise<string> {
    return payload;
  }
  public async compareHash(payload: string, hashed: string): Promise<boolean> {
    return payload === hashed;
  }
}

export default FakeHashProvider;
