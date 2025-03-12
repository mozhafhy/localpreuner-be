import {
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { Repository } from 'typeorm';
import { Umkm } from 'src/users/umkm/entities/umkm.entity';
import { Konsumen } from 'src/users/konsumen/entities/konsumen.entity';

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
    if (!konsumen) throw new NotFoundException('Konsumen does not exist');

    if (!konsumen.umkm)
      throw new UnauthorizedException('Konsumen does not own an UMKM');

    let category = this.createCategory(value);
    category = await this.categoryRepository.save(category);

    if (!konsumen.umkm.categories) {
      konsumen.umkm.categories = [category];
    } else {
      konsumen.umkm.categories.push(category);
    }

    await this.umkmRepository.save(konsumen.umkm);
    console.log(konsumen);
    return { konsumen, statusCode: HttpStatus.OK };
  }

  async removeCategory(username: string, value: string) {
    const konsumen = await this.konsumenRepository.findOne({
      where: { username: username },
      relations: { umkm: { categories: true } },
    });
    if (!konsumen) throw new NotFoundException('Konsumen does not exist');

    if (!konsumen.umkm)
      throw new UnauthorizedException('Konsumen does not own an UMKM');

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
