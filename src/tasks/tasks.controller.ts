import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import {TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { Task } from './task.entity';

@Controller('tasks')
export class TasksController {

  constructor(private tasksService : TasksService) {

  }
  //We can do this as well (but there is a shorter way)
  // tasksService : TasksService
  // constructor(tasksService : TasksService) {
  //   this.tasksService = tasksService;
  // }

  // @Get()
  // getTasks(@Query() filterDto: GetTasksFilterDto): Task[] {
  //
  //   if(Object.keys(filterDto).length){
  //     return this.tasksService.getTasksWithFilters(filterDto);
  //   }else{
  //     return this.tasksService.getAllTasks();
  //   }
  // }
  //

  @Get('/:id')
  getTaskById(@Param('id') id: string): Promise<Task>{
    return this.tasksService.getTaskById(id);
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto) : Promise<Task>{
    return this.tasksService.createTask(createTaskDto);
  }
  // @Get('/:id')
  // getTaskById(@Param('id') id: string): Task{
  //   return this.tasksService.getTaskById(id);
  // }
  // @Post()
  // createTask(@Body() createTaskDto: CreateTaskDto): Task{
  //   return this.tasksService.createTask(createTaskDto);
  // }
  //
  // @Patch('/:id/status')
  // updateTaskStatus(@Param('id') id: string, @Body() updateTaskStatusDto: UpdateTaskStatusDto): Task{
  //   const {status} = updateTaskStatusDto;
  //   return this.tasksService.updateTaskStatus(id, status);
  // }
  //
  // @Delete('/:id')
  // deleteTaskById(@Param('id') id: string): void{
  //   this.tasksService.deleteTaskById(id);
  // }


}
