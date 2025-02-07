import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'passport' })
export class Passport {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'number', type: 'varchar' })
  number: string;

  @Column({ name: 'expiry_date' })
  expiry: Date;
}

@Entity({ name: 'driving_license' })
export class DrivingLicense {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'number', type: 'varchar' })
  number: string;

  @Column({ name: 'license', type: 'varchar' })
  license: string;

  @Column({ name: 'state', type: 'varchar' })
  state: string;

  @Column({ name: 'expiry_date', nullable: false })
  expiry: Date;
}

@Entity({ name: 'medicare' })
export class Medicare {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'medicare_number' })
  number: string;

  @Column({ name: 'reference_number' })
  reference: string;

  @Column({ name: 'expiry_date' })
  expiry: Date;
}

@Entity({ name: 'identity' })
export class Identity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'verified', type: 'boolean', default: false })
  verified: boolean;

  @OneToOne(() => Passport, {
    cascade: true,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'passport_id' })
  passport: Passport | null;

  @OneToOne(() => DrivingLicense, {
    cascade: true,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'driving_license_id' })
  drivingLicense: DrivingLicense | null;

  @OneToOne(() => Medicare, {
    cascade: true,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'medicare_id' })
  medicare: Medicare | null;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt: Date;
}
