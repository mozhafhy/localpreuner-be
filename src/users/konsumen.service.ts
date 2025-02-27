import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Konsumen } from './konsumen.entity';

@Injectable()
export class KonsumenService {
  constructor(
    @InjectRepository(Konsumen)
    private konsumenRepository: Repository<Konsumen>,
  ) {}

  findAll(): Promise<Konsumen[]> {
    return this.konsumenRepository.find();
  }

  findOne(username: string): Promise<Konsumen | null> {
    return this.konsumenRepository.findOneBy({ username });
  }

  async remove(id: number): Promise<void> {
    await this.konsumenRepository.delete(id);
  }
}
