import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Article } from '../entities/article.entity'
import { Writer } from '../entities/writer.entity'

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(Article)
    private articlesRepository: Repository<Article>,
    @InjectRepository(Writer)
    private writersRepository: Repository<Writer>,
  ) {}

  async create(articleData: {
    title: string
    content?: string
    writerId: number
  }) {
    const writer = await this.writersRepository.findOne({
      where: { id: articleData.writerId },
    })
    if (!writer) throw new NotFoundException('Writer not found')
    const article = this.articlesRepository.create({
      title: articleData.title,
      content: articleData.content,
      writer,
    })
    return this.articlesRepository.save(article)
  }

  findAll() {
    return this.articlesRepository.find({ relations: ['writer'] })
  }

  findOne(id: number) {
    return this.articlesRepository.findOne({
      where: { id },
      relations: ['writer'],
    })
  }

  async update(
    id: number,
    updateData: { title?: string; content?: string; writerId?: number },
  ) {
    const article = await this.articlesRepository.findOne({ where: { id } })
    if (!article) throw new NotFoundException('Article not found')
    if (updateData.writerId !== undefined) {
      const writer = await this.writersRepository.findOne({
        where: { id: updateData.writerId },
      })
      if (!writer) throw new NotFoundException('Writer not found')
      article.writer = writer
    }
    if (updateData.title !== undefined) article.title = updateData.title
    if (updateData.content !== undefined) article.content = updateData.content
    return this.articlesRepository.save(article)
  }

  async remove(id: number) {
    const article = await this.findOne(id)
    if (article) {
      await this.articlesRepository.remove(article)
    }
    return article
  }
}
