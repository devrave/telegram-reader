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

  public async create(name: string) {
    const group = new Group();

    group.name = name;
    group.channels = [];

    await this.groupRepository.save(group);
  }
}
