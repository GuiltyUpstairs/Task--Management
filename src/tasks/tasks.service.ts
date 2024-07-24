import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import {v4 as uuid} from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TasksRepository } from './tasks.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksRepository)
    private tasksRepository: TasksRepository) {
  }
  // private tasks: Task[] = [];
  //
  //
  // getAllTasks(): Task[]{
  //   return this.tasks
  // }
  //
  // getTasksWithFilters(filterDto: GetTasksFilterDto): Task[]{
  //   const {status, search} = filterDto;
  //   let tasks = this.getAllTasks();
  //   if(status){
  //     tasks = tasks.filter(task => task.status === status);
  //   }
  //
  //   if(search){
  //     tasks = tasks.filter(task => task.title.includes(search) || task.description.includes(search));
  //   }
  //
  //   return tasks;
  // }

  async getTaskById(id: string): Promise<Task>{
    const found = await this.tasksRepository.findOne(id)
    if(!found){
      throw new NotFoundException(`Task with id "${id}" is not found.`)
    }
    return found;
  }
  // getTaskById(id: string): Task{
  //   const found = this.tasks.find(task => task.id === id);
  //   if(!found) {
  //     throw new NotFoundException();
  //   }
  //   return found
  // }

  createTask(createTaskDto: CreateTaskDto) : Promise<Task>{
    return this.tasksRepository.createTask(createTaskDto);
  }
  // createTask(createTaskDto : CreateTaskDto): Task {
  //   const {title, description} = createTaskDto;
  //   const task: Task = {
  //     id: uuid(),
  //     title,
  //     description,
  //     status: TaskStatus.OPEN,
  //   }
  //
  //   this.tasks.push(task);
  //
  //   return task;
  // }
  //
  // updateTaskStatus(id: string, status: TaskStatus): Task{
  //   const task = this.getTaskById(id);
  //   task.status = status;
  //   return task;
  // }
  // deleteTaskById(id: string): void{
  //   const found = this.getTaskById(id);
  //   this.tasks = this.tasks.filter(task => task.id !== found.id);
  // }
}
