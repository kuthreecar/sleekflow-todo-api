import {
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateTodoItemDto } from './dto/create-todo-item.dto';
import { NullableType } from '../utils/types/nullable.type';
import { FilterTodoItemDto, SortTodoItemDto } from './dto/query-todo-item.dto';
import { TodoItemRepository } from './infrastructure/persistence/todo-item.repository';
import { TodoItem } from './domain/todo-item';
import { FilesService } from '../files/files.service';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { FileType } from '../files/domain/file';
import { UpdateTodoItemDto } from './dto/update-todo-item.dto';

@Injectable()
export class TodoItemsService {
  constructor(
    private readonly todoItemsRepository: TodoItemRepository,
    private readonly filesService: FilesService,
  ) {}

  async create(
    createTodoItemDto: CreateTodoItemDto,
    ownerId: number,
  ): Promise<TodoItem> {
    let photo: FileType | null | undefined = undefined;

    if (createTodoItemDto.media?.id) {
      const fileObject = await this.filesService.findById(
        createTodoItemDto.media.id,
      );
      if (!fileObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            photo: 'imageNotExists',
          },
        });
      }
      photo = fileObject;
    } else if (createTodoItemDto.media === null) {
      photo = null;
    }

    return this.todoItemsRepository.create({
      name: createTodoItemDto.name,
      description: createTodoItemDto.description,
      dueDate: createTodoItemDto.dueDate,
      status: createTodoItemDto.status,
      priority: createTodoItemDto.priority,
      ownerId: ownerId,
      tags: createTodoItemDto.tags,
    });
  }

  findManyWithPagination({
    ownerId,
    filterOptions,
    sortOptions,
    paginationOptions,
  }: {
    ownerId: number;
    filterOptions?: FilterTodoItemDto | null;
    sortOptions?: SortTodoItemDto[] | null;
    paginationOptions: IPaginationOptions;
  }): Promise<TodoItem[]> {
    return this.todoItemsRepository.findManyWithPagination({
      ownerId,
      filterOptions,
      sortOptions,
      paginationOptions,
    });
  }

  findById(id: TodoItem['id']): Promise<NullableType<TodoItem>> {
    return this.todoItemsRepository.findById(id);
  }

  findByIds(ids: TodoItem['id'][]): Promise<TodoItem[]> {
    return this.todoItemsRepository.findByIds(ids);
  }

  async update(
    id: TodoItem['id'],
    updateTodoItemDto: UpdateTodoItemDto,
    ownerId: number,
  ): Promise<TodoItem | null> {
    
    let todoItem = await this.todoItemsRepository.findById(id)

    if (!todoItem) {
      throw new NotFoundException();
    }
    if(todoItem?.ownerId != ownerId) {
      throw new UnauthorizedException();
    }

    return this.todoItemsRepository.update(id, {
      name: updateTodoItemDto.name,
      description: updateTodoItemDto.description,
      priority: updateTodoItemDto.priority,
      tags: updateTodoItemDto.tags,
      dueDate: updateTodoItemDto.dueDate,
      status: updateTodoItemDto.status,
    });
  }

  async remove(id: TodoItem['id']): Promise<void> {
    await this.todoItemsRepository.remove(id);
  }
}
