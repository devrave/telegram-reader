import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { nanoid } from "nanoid/async";
import { User } from "./user.entity";

const USER_PRIVATE_KEY_LENGTH = 256;

@Injectable()
export class UserService {
  public constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  public async create() {
    const user = new User();

    user.privateKey = await this.generatePrivateKey();

    return this.userRepository.save(user);
  }

  private async generatePrivateKey() {
    return nanoid(USER_PRIVATE_KEY_LENGTH);
  }
}
