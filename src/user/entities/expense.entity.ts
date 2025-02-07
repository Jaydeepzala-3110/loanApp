import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'expenses' })
export class Expenses {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'living',
    nullable: false,
    type: 'numeric',
    precision: 10,
    scale: 2,
  })
  living: number;

  @Column({
    name: 'rent',
    nullable: false,
    type: 'numeric',
    precision: 10,
    scale: 2,
  })
  rent: number;

  @Column({
    name: 'loan',
    nullable: false,
    type: 'numeric',
    precision: 10,
    scale: 2,
  })
  loan: number;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt: Date;
}
