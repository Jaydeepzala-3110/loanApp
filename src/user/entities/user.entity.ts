import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Employement } from './employment.entity';
import { Expenses } from './expense.entity';
import {
  RelationshipStatus,
  ResidentialStatus,
  UserRole,
  UserStatus,
} from 'src/utils/enum.utils';
import { Identity } from './identity.entity';
import { Exclude } from 'class-transformer';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'first_name', nullable: true })
  firstName: string;

  @Column({ name: 'last_name', nullable: true })
  lastName: string;

  @Column({ name: 'email', nullable: true, unique: true })
  email: string;

  @Column({ name: 'age', nullable: true })
  age: number;

  @Column({ name: 'password', nullable: true, select: false })
  @Exclude()
  password: string;

  @Column({ name: 'phone', nullable: true })
  phone: string;

  @Column({
    name: 'role',
    nullable: true,
    type: 'enum',
    enum: UserRole,
    default: UserRole.Customer,
  })
  role: UserRole;

  @Column({
    name: 'status',
    nullable: true,
    type: 'enum',
    enum: UserStatus,
    default: UserStatus.Active,
  })
  status: UserStatus;

  @Column({
    name: 'blocked_until',
    nullable: true,
    type: 'timestamp',
  })
  blockedUntil: Date | null;

  @Column({
    name: 'relationship',
    type: 'enum',
    enum: RelationshipStatus,
    default: RelationshipStatus.Single,
  })
  relationship: RelationshipStatus;

  @Column({ name: 'birth_date', nullable: true })
  birthDate: Date;

  @Column({
    name: 'dependant_number',
    nullable: true,
    type: 'integer',
  })
  dependantNumber: number;

  @Column({
    name: 'residential_status',
    type: 'enum',
    enum: ResidentialStatus,
    default: ResidentialStatus.LivingWithFamily,
  })
  residentialStatus: ResidentialStatus;

  @Column({ name: 'address', nullable: true })
  address: string;

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

  @Column({
    name: 'returning_customer',
    default: true,
  })
  returningCustomer: boolean;

  @OneToOne(() => Identity, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'identity_id' })
  identity: Identity;

  @Column({ name: 'email_unsubscribed', type: 'boolean', default: false })
  emailUnsubscribed: boolean;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt: Date;
}
