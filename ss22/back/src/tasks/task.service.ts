import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaskEntity, TaskStatus } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(TaskEntity)
    private readonly taskRepository: Repository<TaskEntity>,
  ) {}

  async create(createDto: CreateTaskDto): Promise<TaskEntity> {
    const task = this.taskRepository.create({
      ...createDto,
      status: TaskStatus.Pending,
    });
    return await this.taskRepository.save(task);
  }

  async findAll(): Promise<TaskEntity[]> {
    return await this.taskRepository.find({ order: { id: 'DESC' } });
  }

  async findOne(id: number): Promise<TaskEntity> {
    const task = await this.taskRepository.findOne({ where: { id } });
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    return task;
  }

  async update(id: number, updateDto: UpdateTaskDto): Promise<TaskEntity> {
    const task = await this.findOne(id);
    Object.assign(task, updateDto);
    return await this.taskRepository.save(task);
  }

  async updateStatus(id: number, status: TaskStatus): Promise<TaskEntity> {
    const task = await this.findOne(id);
    task.status = status;
    return await this.taskRepository.save(task);
  }

  async remove(id: number): Promise<void> {
    const task = await this.taskRepository.findOneBy({ id });
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    await this.taskRepository.delete(id);
    return;
  }
}
