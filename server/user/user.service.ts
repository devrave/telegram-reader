import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { nanoid } from "nanoid/async";
import { User } from "./user.entity";

export const USER_PRIVATE_KEY_LENGTH = 256;

@Injectable()
export class UserService {
  public constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  public async register(name: string) {
    const user = new User();

    user.name = name;
    user.privateKey = await this.generatePrivateKey();
    user.groups = [];

    return this.userRepository.save(user);
  }

  public async getUserByPrivateKey(privateKey: string) {
    return this.userRepository.findOne({
      where: {
        privateKey
      }
    });
  }

  private async generatePrivateKey() {
    return nanoid(USER_PRIVATE_KEY_LENGTH);
  }
}
