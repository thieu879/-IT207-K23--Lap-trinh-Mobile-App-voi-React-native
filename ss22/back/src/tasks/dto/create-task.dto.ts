import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { TaskPriority } from '../task.entity';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name!: string;

  @IsEnum(TaskPriority)
  priority!: TaskPriority;

  @IsString()
  @IsOptional()
  description?: string | null;
}
