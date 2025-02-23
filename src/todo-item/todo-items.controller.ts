import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpStatus,
  HttpCode,
  SerializeOptions,
  UseGuards,
  Request,
} from '@nestjs/common';
import { CreateTodoItemDto } from './dto/create-todo-item.dto';
import { UpdateTodoItemDto } from './dto/update-todo-item.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../utils/dto/infinity-pagination-response.dto';
import { NullableType } from '../utils/types/nullable.type';
import { QueryTodoItemDto } from './dto/query-todo-item.dto';
import { TodoItem } from './domain/todo-item';
import { TodoItemsService } from './todo-items.service';
import { infinityPagination } from '../utils/infinity-pagination';
import { AuthGuard } from '@nestjs/passport';

@ApiBearerAuth()
@ApiTags('TodoItems')
@Controller({
  path: 'todo-items',
  version: '1',
})
@UseGuards(AuthGuard('jwt'))
export class TodoItemsController {
  constructor(private readonly todoItemsService: TodoItemsService) {}

  @ApiCreatedResponse({
    type: TodoItem,
  })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(
    @Body() createTodoItemDto: CreateTodoItemDto,
    @Request() req: any,
  ): Promise<TodoItem> {
    return this.todoItemsService.create(createTodoItemDto, req.user.id);
  }

  @ApiOkResponse({
    type: InfinityPaginationResponse(TodoItem),
  })
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(
    @Query() query: QueryTodoItemDto,
    @Request() req: any,
  ): Promise<InfinityPaginationResponseDto<TodoItem>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }
    return infinityPagination(
      await this.todoItemsService.findManyWithPagination({
        ownerId: req.user.id,
        filterOptions: query?.filters,
        sortOptions: query?.sort,
        paginationOptions: {
          page,
          limit,
        },
      }),
      { page, limit },
    );
  }

  @ApiOkResponse({
    type: TodoItem,
  })
  @SerializeOptions({
    groups: ['admin'],
  })
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  findOne(@Param('id') id: TodoItem['id']): Promise<NullableType<TodoItem>> {
    return this.todoItemsService.findById(id);
  }

  @ApiOkResponse({
    type: TodoItem,
  })
  @SerializeOptions({
    groups: ['admin'],
  })
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  update(
    @Param('id') id: TodoItem['id'],
    @Body() updateProfileDto: UpdateTodoItemDto,
    @Request() req: any,
  ): Promise<TodoItem | null> {
    return this.todoItemsService.update(id, updateProfileDto, req.user.id);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: TodoItem['id']): Promise<void> {
    return this.todoItemsService.remove(id);
  }
}
