import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './controllers/users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { DashboardController } from './controllers/dashboard.controller';
import { NestjsFormDataModule } from 'nestjs-form-data';

@Module({
  imports: [TypeOrmModule.forFeature([User]), NestjsFormDataModule],
  controllers: [DashboardController, UsersController],
  providers: [UsersService],
})
export class AdminsModule {}
