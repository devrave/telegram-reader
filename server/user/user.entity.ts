import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Group } from "server/group/group.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  public name!: string;

  @Column()
  public privateKey!: string;

  @OneToMany(() => Group, (group) => group.user)
  public groups!: Group[];
}
