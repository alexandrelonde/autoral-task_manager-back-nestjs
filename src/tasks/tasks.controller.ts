// eslint-disable-next-line prettier/prettier
import { Body, Controller, Post, Get, Param, Patch, Delete } from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(@Body('title') title: string) {
    return this.tasksService.create(title);
  }

  @Get()
  findAll() {
    return this.tasksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tasksService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body('isCompleted') isCompleted: boolean) {
    return this.tasksService.update(+id, isCompleted);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tasksService.remove(+id);
  }
}
