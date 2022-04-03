import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Group } from "./group.entity";

@Injectable()
export class GroupService {
  public constructor(
    @InjectRepository(Group)
    private groupRepository: Repository<Group>
  ) {}

  public async create(name: string, userID: number) {
    const group = new Group();

    group.name = name;
    group.channels = [];
    group.userID = userID;

    return this.groupRepository.save(group);
  }

  public async getUserGroups(userID: number) {
    return this.groupRepository.find({
      where: {
        userID
      }
    });
  }
}
