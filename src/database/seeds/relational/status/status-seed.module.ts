import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StatusSeedService } from './status-seed.service';
import { TodoItemStatusEntity } from '../../../../statuses/infrastructure/persistence/relational/entities/todo-item-status.entity';
import { UserStatusEntity } from '../../../../statuses/infrastructure/persistence/relational/entities/user-status.entity';
@Module({
  imports: [TypeOrmModule.forFeature([UserStatusEntity, TodoItemStatusEntity])],
  providers: [StatusSeedService],
  exports: [StatusSeedService],
})
export class StatusSeedModule {}
