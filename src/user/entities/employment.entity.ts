import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'employement' })
export class Employement {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'type', type: 'varchar', nullable: false })
  type: string;

  @Column({ name: 'employer', type: 'varchar', nullable: false })
  employer: string;

  @Column({ name: 'payFrequency', type: 'varchar', nullable: false })
  payFrequency: string;

  @Column({
    name: 'payAfterTax',
    type: 'numeric',
    precision: 10,
    scale: 2,
    nullable: false,
  })
  payAfterTax: number;

  @Column({ name: 'next_pay_date' })
  nextPayDate: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
