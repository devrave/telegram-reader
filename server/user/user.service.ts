import { Injectable } from "@nestjs/common";
import { nanoid } from "nanoid/async";

const USER_PRIVATE_KEY_LENGTH = 256;

@Injectable()
export class UserService {
  private generatePrivateKey() {
    return nanoid(USER_PRIVATE_KEY_LENGTH);
  }
}
