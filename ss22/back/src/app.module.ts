import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskModule } from './tasks/task.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '3306', 10),
      username: process.env.DB_USER || 'root',
      password: process.env.DB_PASS || '123456',
      database: process.env.DB_NAME || 'my_motherfucker_todolist',
      autoLoadEntities: true,
      synchronize: true,
      logging: false,
    }),
    TaskModule,
  ],
})
export class AppModule {}
