import { Employement } from 'src/user/entities/employment.entity';
import { Expenses } from 'src/user/entities/expense.entity';
import { User } from 'src/user/entities/user.entity';
import { ApplicationStatus, LoanReason } from 'src/utils/enum.utils';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'applications' })
export class Application {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.id, {
    nullable: false,
  })
  customer: User;

  @ManyToOne(() => User, (user) => user.id, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  agent: User | null;

  @Column({
    name: 'loanReason',
    type: 'enum',
    enum: LoanReason,
    default: LoanReason.Living,
  })
  loanReason: string;

  @Column({
    name: 'loan_amount',
    type: 'numeric',
    precision: 20,
    scale: 4,
    default: 0,
  })
  loanAmount: number;

  @Column({
    name: 'principal_amount',
    type: 'numeric',
    precision: 20,
    scale: 4,
    default: 0,
  })
  principalAmount: number;

  @Column({ name: 'applied_date', type: 'timestamp', nullable: true })
  appliedDate: Date;

  @Column({
    name: 'status',
    type: 'enum',
    enum: ApplicationStatus,
    default: ApplicationStatus.Draft,
  })
  status: ApplicationStatus;

  @OneToOne(() => Expenses, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'expense_id' })
  expenses: Expenses;

  @OneToOne(() => Employement, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'employement_id' })
  employement: Employement;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt: Date;
}
