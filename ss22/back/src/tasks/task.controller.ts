import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { TaskEntity } from './task.entity';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('Tasks')
@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  @ApiBody({
    description: 'Create a new task',
    schema: {
      example: {
        name: 'Buy milk',
        priority: 'HIGH',
        description: '2% milk, 1 gallon',
      },
    },
  })
  async create(@Body() dto: CreateTaskDto): Promise<TaskEntity> {
    return await this.taskService.create(dto);
  }

  @Get()
  async findAll(): Promise<TaskEntity[]> {
    return await this.taskService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<TaskEntity> {
    return await this.taskService.findOne(id);
  }

  @Put(':id')
  @ApiBody({
    description: 'Replace task by id',
    schema: {
      example: {
        name: 'Buy groceries',
        priority: 'MEDIUM',
        description: 'Milk, eggs, bread',
      },
    },
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateTaskDto,
  ): Promise<TaskEntity> {
    return await this.taskService.update(id, dto);
  }

  @Patch(':id/status')
  @ApiBody({
    description: 'Update task status by id',
    schema: {
      example: {
        status: 'DONE',
      },
    },
  })
  async updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateStatusDto,
  ): Promise<TaskEntity> {
    return await this.taskService.updateStatus(id, dto.status);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.taskService.remove(id);
  }
}
