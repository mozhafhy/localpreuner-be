import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from '../entities/category.entity';
import { Repository } from 'typeorm';
import { Umkm } from 'src/users/entities/umkm.entity';
import { Konsumen } from 'src/users/entities/konsumen.entity';
import { ResponsMessage } from 'src/commons/enums/response-message.enum';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(Umkm)
    private umkmRepository: Repository<Umkm>,
    @InjectRepository(Konsumen)
    private konsumenRepository: Repository<Konsumen>,
  ) {}

  async addCategory(username: string, value: string) {
    const konsumen = await this.konsumenRepository.findOne({
      where: { username: username },
      relations: { umkm: { categories: true } },
    });
    if (!konsumen)
      throw new NotFoundException(ResponsMessage.KONSUMEN_NOT_FOUND);

    if (!konsumen.umkm)
      throw new UnauthorizedException(ResponsMessage.UNAUTHORIZED);

    let category = this.createCategory(value);
    category = await this.categoryRepository.save(category);

    if (!konsumen.umkm.categories) {
      konsumen.umkm.categories = [category];
    } else {
      konsumen.umkm.categories.push(category);
    }

    await this.umkmRepository.save(konsumen.umkm);
    console.log(konsumen);
    return { konsumen };
  }

  async removeCategory(username: string, value: string) {
    const konsumen = await this.konsumenRepository.findOne({
      where: { username: username },
      relations: { umkm: { categories: true } },
    });
    if (!konsumen)
      throw new NotFoundException(ResponsMessage.KONSUMEN_NOT_FOUND);

    if (!konsumen.umkm)
      throw new UnauthorizedException(ResponsMessage.UNAUTHORIZED);

    konsumen.umkm.categories = konsumen.umkm.categories.filter(
      (v) => v.value !== value,
    );
    await this.umkmRepository.save(konsumen.umkm);

    return { konsumen };
  }

  createCategory(value: string) {
    // const category = this.categoryRepository.create({ value });
    return this.categoryRepository.create({ value });
  }
}
