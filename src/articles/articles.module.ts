import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Article } from '../entities/article.entity'
import { ArticlesService } from './articles.service'
import { ArticlesController } from './articles.controller'
import { Writer } from 'src/entities/writer.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Article, Writer])],
  providers: [ArticlesService],
  controllers: [ArticlesController],
})
export class ArticlesModule {}
