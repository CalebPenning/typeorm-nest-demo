import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import { Writer } from './writer.entity'

@Entity('articles')
export class Article {
  @PrimaryGeneratedColumn()
  id: number

  @Column('varchar', { length: 200 })
  title: string

  @Column('text', { nullable: true })
  content: string

  @ManyToOne(() => Writer, (writer) => writer.articles, { onDelete: 'CASCADE' })
  writer: Writer
}
