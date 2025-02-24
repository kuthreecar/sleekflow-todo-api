import request from 'supertest';
import { APP_URL, TESTER_EMAIL, TESTER_PASSWORD } from '../utils/constants';
import { PriorityEnum } from '../../src/todo-item/priority.enum';
import { TodoItemStatusEnum } from '../../src/statuses/statuses.enum';

describe('Todo Item Module', () => {
  let token: string;
  let todoItemId: string;

  beforeAll(async () => {
    const response = await request(APP_URL)
      .post('/api/v1/auth/email/login')
      .send({ email: TESTER_EMAIL, password: TESTER_PASSWORD });
    token = response.body.token;
  });

  it('should create a todo item', async () => {
    const createResponse = await request(APP_URL)
      .post('/api/v1/todo-items')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Test Todo Item',
        description: 'Test Description',
        priority: PriorityEnum.High,
        tags: ['tag1', 'tag2'],
        status: TodoItemStatusEnum.InProgress,
        dueDate: new Date().toISOString(),
      });
    expect(createResponse.status).toBe(201);
    expect(createResponse.body).toHaveProperty('id');
    todoItemId = createResponse.body.id;
  });

  it('should update a todo item', async () => {
    const dueDate = new Date().toISOString();
    const updateResponse = await request(APP_URL)
      .patch(`/api/v1/todo-items/${todoItemId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        description: 'Updated Test Description',
        priority: PriorityEnum.Medium,
        tags: ['tag3', 'tag4'],
        status: TodoItemStatusEnum.Completed,
        dueDate: dueDate,
      });
    expect(updateResponse.status).toBe(200);
    expect(updateResponse.body.description).toBe('Updated Test Description');
    expect(updateResponse.body.priority).toBe(PriorityEnum.Medium);
    expect(updateResponse.body.tags).toEqual(['tag3', 'tag4']);
    expect(updateResponse.body.dueDate).toBe(dueDate);
  });

  it('should get a todo item by id', async () => {
    const getResponse = await request(APP_URL)
      .get(`/api/v1/todo-items/${todoItemId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(getResponse.status).toBe(200);
    expect(getResponse.body.id).toBeDefined();
  });

  it('should get a list of todo items', async () => {
    const listResponse = await request(APP_URL)
      .get('/api/v1/todo-items')
      .set('Authorization', `Bearer ${token}`);

    expect(listResponse.status).toBe(200);
    expect(Array.isArray(listResponse.body.data)).toBe(true);
  });

  it('should get a list of todo items sorted by priority', async () => {
    const sortedResponse = await request(APP_URL)
      .get('/api/v1/todo-items?sort=[{"orderBy":"id","order":"desc"}]')
      .set('Authorization', `Bearer ${token}`);

    expect(sortedResponse.status).toBe(200);
    expect(Array.isArray(sortedResponse.body.data)).toBe(true);

    sortedResponse.body.data.reduce((prev: any, current: any) => {
      expect(prev.id).toBeGreaterThan(current.id);
      return current;
    });
  });

  it('should get a list of todo items filtered by status', async () => {
    const statusFilterResponse = await request(APP_URL)
      .get('/api/v1/todo-items?filters={"status":["NotStart"]}')
      .set('Authorization', `Bearer ${token}`);

    expect(statusFilterResponse.status).toBe(200);
    expect(Array.isArray(statusFilterResponse.body.data)).toBe(true);
    // Add additional checks to ensure the list is filtered by status
    statusFilterResponse.body.data.forEach((item: any) => {
      expect(item.status).toBe(TodoItemStatusEnum.NotStart);
    });
  });

  it('should delete a todo item', async () => {
    const deleteResponse = await request(APP_URL)
      .delete(`/api/v1/todo-items/${todoItemId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(deleteResponse.status).toBe(204);

    // Verify the item has been deleted
    const getResponse = await request(APP_URL)
      .get(`/api/v1/todo-items/${todoItemId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(getResponse.status).toBe(404);
  });
});
