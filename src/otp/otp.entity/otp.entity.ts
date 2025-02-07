import { User } from 'src/user/entities/user.entity';
import { ContactType } from 'src/utils/enum.utils';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('otps')
export class OTP {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.id)
  user: User;

  @Column({
    name: 'type',
    type: 'enum',
    enum: ContactType,
    default: ContactType.Email,
  })
  type: string;

  @Column({ name: 'value', type: 'varchar' })
  value: string;

  @Column({ name: 'otp', type: 'varchar', length: 6 })
  otp: string;

  @Column({ name: 'expires_at', type: 'timestamp', default: null })
  expiresAt: Date;
}
