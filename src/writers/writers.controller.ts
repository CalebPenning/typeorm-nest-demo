import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common'
import { WritersService } from './writers.service'

@Controller('writers')
export class WritersController {
  constructor(private readonly writersService: WritersService) {}

  @Post()
  async create(@Body() createWriterDto: { name: string; email: string }) {
    return await this.writersService.create(createWriterDto)
  }

  @Get()
  async findAll() {
    return await this.writersService.findAll()
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.writersService.findOne(Number(id))
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateWriterDto: { name?: string; email?: string },
  ) {
    return await this.writersService.update(Number(id), updateWriterDto)
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.writersService.remove(Number(id))
  }
}
