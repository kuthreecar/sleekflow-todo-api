import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StatusSeedService } from './status-seed.service';
import { UserStatusEntity } from '../../../../statuses/infrastructure/persistence/relational/entities/user-status.entity';
@Module({
  imports: [TypeOrmModule.forFeature([UserStatusEntity])],
  providers: [StatusSeedService],
  exports: [StatusSeedService],
})
export class StatusSeedModule {}
