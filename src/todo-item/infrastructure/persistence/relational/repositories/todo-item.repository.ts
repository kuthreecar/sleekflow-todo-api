import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { FindOptionsWhere, Repository, In, IsNull } from 'typeorm';
import { TodoItemEntity } from '../entities/todo-item.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import {
  FilterTodoItemDto,
  SortTodoItemDto,
} from '../../../../dto/query-todo-item.dto';
import { TodoItem } from '../../../../domain/todo-item';
import { TodoItemRepository } from '../../todo-item.repository';
import { TodoItemMapper } from '../mappers/todo-item.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class TodoItemsRelationalRepository implements TodoItemRepository {
  constructor(
    @InjectRepository(TodoItemEntity)
    private readonly todoItemsRepository: Repository<TodoItemEntity>,
  ) {}

  async create(data: TodoItem): Promise<TodoItem> {
    const persistenceModel = TodoItemMapper.toPersistence(data);
    const newEntity = await this.todoItemsRepository.save(
      this.todoItemsRepository.create(persistenceModel),
    );
    return TodoItemMapper.toDomain(newEntity);
  }

  async findManyWithPagination({
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
    const where: FindOptionsWhere<TodoItemEntity> = { ownerId, deletedAt: IsNull() };
    if (filterOptions?.status != null) {
      where.status = In(filterOptions?.status);
    }

    const entities = await this.todoItemsRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
      where: where,
      order: sortOptions?.reduce(
        (accumulator, sort) => ({
          ...accumulator,
          [sort.orderBy]: sort.order,
        }),
        {},
      ),
    });
    return entities.map((todoItem) => TodoItemMapper.toDomain(todoItem));
  }

  async findById(id: TodoItem['id']): Promise<NullableType<TodoItem>> {
    const entity = await this.todoItemsRepository.findOne({
      where: { id: Number(id) },
    });

    return entity ? TodoItemMapper.toDomain(entity) : null;
  }

  async findByIds(ids: TodoItem['id'][]): Promise<TodoItem[]> {
    const entities = await this.todoItemsRepository.find({
      where: { id: In(ids) },
    });

    return entities.map((user) => TodoItemMapper.toDomain(user));
  }

  async update(
    id: TodoItem['id'],
    payload: Partial<TodoItem>,
  ): Promise<TodoItem> {
    const entity = await this.todoItemsRepository.findOne({
      where: { id: Number(id) },
    });

    if (!entity) {
      throw new Error('TodoItem not found');
    }

    const updatedEntity = await this.todoItemsRepository.save(
      this.todoItemsRepository.create(
        TodoItemMapper.toPersistence({
          ...TodoItemMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return TodoItemMapper.toDomain(updatedEntity);
  }

  async remove(id: TodoItem['id']): Promise<void> {
    console.log(id);
    await this.todoItemsRepository.softDelete(id);
  }
}
