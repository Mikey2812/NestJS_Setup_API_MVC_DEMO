import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { dataSourceOptions } from './config/data-source';
import { CommandModule } from 'nestjs-command';
import { ConfigModule } from '@nestjs/config';
import { AdminsModule } from './admin/admin.module';

const environment = process.env.NODE_ENV || 'development';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${environment}`,
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(dataSourceOptions),
    CommandModule,
    UsersModule,
    AdminsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
