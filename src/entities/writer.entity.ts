import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { Article } from './article.entity'

@Entity('writers')
export class Writer {
  @PrimaryGeneratedColumn()
  id: number

  @Column('varchar', { length: 100 })
  name: string

  @Column('varchar', { length: 100, unique: true })
  email: string

  @OneToMany(() => Article, (article) => article.writer)
  articles: Article[]
}
