import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TodoItemStatusEntity } from '../../../../statuses/infrastructure/persistence/relational/entities/todo-item-status.entity';
import { UserStatusEntity } from '../../../../statuses/infrastructure/persistence/relational/entities/user-status.entity';
import {
  UserStatusEnum,
  TodoItemStatusEnum,
} from '../../../../statuses/statuses.enum';

@Injectable()
export class StatusSeedService {
  constructor(
    @InjectRepository(UserStatusEntity)
    private userStatusRepository: Repository<UserStatusEntity>,
    @InjectRepository(TodoItemStatusEntity)
    private todoItemStatusRepository: Repository<TodoItemStatusEntity>,
  ) {}

  async run() {
    const userStatusCount = await this.userStatusRepository.count();

    if (!userStatusCount) {
      await this.userStatusRepository.save([
        this.userStatusRepository.create({
          id: UserStatusEnum.active,
          name: 'Active',
        }),
        this.userStatusRepository.create({
          id: UserStatusEnum.inactive,
          name: 'Inactive',
        }),
      ]);
    }
  }
}
