import request from 'supertest';
import { APP_URL, TESTER_EMAIL, TESTER_PASSWORD } from '../utils/constants';

describe('Todo Item Module', () => {
  let token: string;
  let todoItemId: string;

  beforeAll(async () => {
    const response = await request(APP_URL)
      .post('/auth/login')
      .send({ email: TESTER_EMAIL, password: TESTER_PASSWORD });
    token = response.body.token;
  });

  it('should create a todo item', async () => {
    const createResponse = await request(APP_URL)
      .post('/todo-items')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Test Todo Item',
        description: 'Test Description',
        priority: 2,
        tags: ['test'],
        status: { id: '1' },
        dueDate: new Date().toISOString(),
      });

    expect(createResponse.status).toBe(201);
    expect(createResponse.body).toHaveProperty('id');
    todoItemId = createResponse.body.id;
  });

  it('should update a todo item', async () => {
    const updateResponse = await request(APP_URL)
      .put(`/todo-items/${todoItemId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Updated Test Todo Item',
        description: 'Updated Test Description',
        priority: 'High',
        tags: ['updated-test'],
        status: { id: '2' },
        dueDate: new Date().toISOString(),
      });

    expect(updateResponse.status).toBe(200);
    expect(updateResponse.body.name).toBe('Updated Test Todo Item');
    expect(updateResponse.body.priority).toBe('High');
  });

  it('should get a todo item by id', async () => {
    const getResponse = await request(APP_URL)
      .get(`/todo-items/${todoItemId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(getResponse.status).toBe(200);
    expect(getResponse.body).toHaveProperty('id', todoItemId);
    expect(getResponse.body.name).toBe('Updated Test Todo Item');
  });

  it('should get a list of todo items', async () => {
    const listResponse = await request(APP_URL)
      .get('/todo-items')
      .set('Authorization', `Bearer ${token}`);

    expect(listResponse.status).toBe(200);
    expect(Array.isArray(listResponse.body)).toBe(true);
  });

  it('should get a list of todo items sorted by priority', async () => {
    const sortedResponse = await request(APP_URL)
      .get('/todo-items?sort=priority')
      .set('Authorization', `Bearer ${token}`);

    expect(sortedResponse.status).toBe(200);
    expect(Array.isArray(sortedResponse.body)).toBe(true);
    // Add additional checks to ensure the list is sorted by priority
  });

  it('should get a list of todo items filtered by status', async () => {
    const statusFilterResponse = await request(APP_URL)
      .get('/todo-items?status=1')
      .set('Authorization', `Bearer ${token}`);

    expect(statusFilterResponse.status).toBe(200);
    expect(Array.isArray(statusFilterResponse.body)).toBe(true);
    // Add additional checks to ensure the list is filtered by status
    statusFilterResponse.body.forEach((item: any) => {
      expect(item.status.id).toBe('1');
    });
  });
});
