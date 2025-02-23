import { TodoItem } from '../../../../domain/todo-item';
import { TodoItemEntity } from '../entities/todo-item.entity';

export class TodoItemMapper {
  static toDomain(raw: TodoItemEntity): TodoItem {
    const domainEntity = new TodoItem();
    domainEntity.id = raw.id;
    domainEntity.name = raw.name;
    domainEntity.priority = raw.priority;
    domainEntity.description = raw.description;
    domainEntity.status = raw.status;
    domainEntity.tags = raw.tags;
    domainEntity.dueDate = raw.dueDate;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;
    domainEntity.ownerId = raw.ownerId;
    return domainEntity;
  }

  static toPersistence(domainEntity: TodoItem): TodoItemEntity {
    const persistenceEntity = new TodoItemEntity();
    if (domainEntity.id && typeof domainEntity.id === 'number') {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.status = domainEntity.status;
    persistenceEntity.name = domainEntity.name;
    persistenceEntity.description = domainEntity.description;
    persistenceEntity.tags = domainEntity.tags;
    persistenceEntity.priority = domainEntity.priority;
    persistenceEntity.dueDate = domainEntity.dueDate;
    persistenceEntity.ownerId = domainEntity.ownerId;
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;
    return persistenceEntity;
  }
}
