import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  async create(title: string): Promise<Task> {
    const task = this.taskRepository.create({ title });
    return this.taskRepository.save(task);
  }

  async findAll(): Promise<Task[]> {
    return this.taskRepository.find();
  }

  async findOne(id: number): Promise<Task> {
    const task = await this.taskRepository.findOne({ where: { id } });
    if (!task) {
      throw new Error(`Task with ID ${id} not found`);
    }
    return task;
  }

  async update(id: number, isCompleted: boolean): Promise<Task> {
    const task = await this.findOne(id); // findOne lança erro se não encontrar a tarefa
    task.isCompleted = isCompleted;
    return this.taskRepository.save(task);
  }

  async remove(id: number): Promise<void> {
    await this.taskRepository.delete(id);
  }
}
