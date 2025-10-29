import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum TaskPriority {
  High = 'Cao',
  Medium = 'Trung bình',
  Low = 'Thấp',
}

export enum TaskStatus {
  Pending = 'Đang chờ',
  Completed = 'Hoàn thành',
}

@Entity('tasks')
export class TaskEntity {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @Column({ type: 'varchar', length: 255 })
  name!: string;

  @Column({ type: 'text', nullable: true })
  description?: string | null;

  @Column({ type: 'varchar', length: 16 })
  priority!: TaskPriority;

  @Column({ type: 'varchar', length: 16, default: TaskStatus.Pending })
  status!: TaskStatus;
}
