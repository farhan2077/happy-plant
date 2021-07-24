import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from "typeorm";

@Entity("plants")
export class Plant {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column("float")
  reading!: number;

  @CreateDateColumn({
    type: "date",
  })
  createdAt!: Date;
}
