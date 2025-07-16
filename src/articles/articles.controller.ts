import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common'
import { ArticlesService } from './articles.service'

type ArticleOperationDTO = {
  title: string
  content?: string
  writerId: number
}

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post()
  async create(
    @Body()
    createArticleDto: ArticleOperationDTO,
  ) {
    return await this.articlesService.create(createArticleDto)
  }

  @Get()
  async findAll() {
    return await this.articlesService.findAll()
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.articlesService.findOne(Number(id))
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body()
    updateArticleDto: ArticleOperationDTO,
  ) {
    return await this.articlesService.update(Number(id), updateArticleDto)
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.articlesService.remove(Number(id))
  }
}
