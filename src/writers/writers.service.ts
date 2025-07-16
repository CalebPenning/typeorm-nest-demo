import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Writer } from '../entities/writer.entity'

@Injectable()
export class WritersService {
  constructor(
    @InjectRepository(Writer)
    private writersRepository: Repository<Writer>,
  ) {}

  create(writerData: Partial<Writer>) {
    const writer = this.writersRepository.create(writerData)
    return this.writersRepository.save(writer)
  }

  findAll() {
    return this.writersRepository.find({ relations: ['articles'] })
  }

  findOne(id: number) {
    return this.writersRepository.findOne({
      where: { id },
      relations: ['articles'],
    })
  }

  async update(id: number, updateData: Partial<Writer>) {
    await this.writersRepository.update(id, updateData)
    return this.findOne(id)
  }

  async remove(id: number) {
    const writer = await this.findOne(id)
    if (writer) {
      await this.writersRepository.remove(writer)
    }
    return writer
  }
}
