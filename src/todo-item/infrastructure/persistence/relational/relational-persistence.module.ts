import { Module } from '@nestjs/common';
import { TodoItemRepository } from '../todo-item.repository';
import { TodoItemsRelationalRepository } from './repositories/todo-item.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoItemEntity } from './entities/todo-item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TodoItemEntity])],
  providers: [
    {
      provide: TodoItemRepository,
      useClass: TodoItemsRelationalRepository,
    },
  ],
  exports: [TodoItemRepository],
})
export class RelationalTodoItemPersistenceModule {}
