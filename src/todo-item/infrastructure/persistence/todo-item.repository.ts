import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { TodoItem } from '../../domain/todo-item';

import {
  FilterTodoItemDto,
  SortTodoItemDto,
} from '../../dto/query-todo-item.dto';

export abstract class TodoItemRepository {
  abstract create(
    data: Omit<TodoItem, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<TodoItem>;

  abstract findManyWithPagination({
    ownerId,
    filterOptions,
    sortOptions,
    paginationOptions,
  }: {
    ownerId: number;
    filterOptions?: FilterTodoItemDto | null;
    sortOptions?: SortTodoItemDto[] | null;
    paginationOptions: IPaginationOptions;
  }): Promise<TodoItem[]>;

  abstract findById(id: TodoItem['id']): Promise<NullableType<TodoItem>>;
  abstract findByIds(ids: TodoItem['id'][]): Promise<TodoItem[]>;

  abstract update(
    id: TodoItem['id'],
    payload: DeepPartial<TodoItem>,
  ): Promise<TodoItem | null>;

  abstract remove(id: TodoItem['id']): Promise<void>;
}
