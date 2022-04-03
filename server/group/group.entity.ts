import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { User } from "../user/user.entity";

@Entity()
export class Group {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  public name!: string;

  @Column("text", { array: true })
  public channels!: string[];

  @ManyToOne(() => User, (user) => user.groups)
  public user!: User;
}
