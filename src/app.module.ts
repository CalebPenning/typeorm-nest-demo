import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { WritersModule } from './writers/writers.module'
import { ArticlesModule } from './articles/articles.module'
import { config } from 'dotenv'

config()

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: +(process.env.DB_PORT || '5432'),
      username: 'postgres',
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: process.env.NODE_ENV === 'development', // For dev only! Don't use in production
    }),
    WritersModule,
    ArticlesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
