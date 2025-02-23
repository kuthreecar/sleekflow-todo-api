import { Module } from '@nestjs/common';

import { TodoItemsController } from './todo-items.controller';

import { TodoItemsService } from './todo-items.service';
import { RelationalTodoItemPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { FilesModule } from '../files/files.module';

const infrastructurePersistenceModule = RelationalTodoItemPersistenceModule;

@Module({
  imports: [
    // import modules, etc.
    infrastructurePersistenceModule,
    FilesModule,
  ],
  controllers: [TodoItemsController],
  providers: [TodoItemsService],
  exports: [TodoItemsService, infrastructurePersistenceModule],
})
export class TodoItemsModule {}
