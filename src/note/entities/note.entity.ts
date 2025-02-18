import { Application } from 'src/application/entities/application.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  BaseEntity,
} from 'typeorm';

@Entity('notes')
class Note extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Application)
  @JoinColumn({ name: 'applicationId' })
  application: Application;

  @Column('text')
  note: string;

  @Column({
    type: 'enum',
    enum: ['note', 'sms', 'log'],
    default: 'note',
  })
  type: 'note' | 'sms' | 'log';

  @ManyToOne(() => User)
  @JoinColumn({ name: 'addedBy' })
  addedBy: User;

  @Column({
    type: 'boolean',
    default: false,
  })
  systemGenerated: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}

export default Note;
