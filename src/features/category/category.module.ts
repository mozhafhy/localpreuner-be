import { Module } from '@nestjs/common';
import { Category } from './category.entity';
import { CategoryService } from './category.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Umkm } from '../../users/umkm/entities/umkm.entity';
import { UmkmService } from 'src/users/umkm/umkm.service';
import { Konsumen } from 'src/users/konsumen/entities/konsumen.entity';
import { CategoryController } from './category.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Category, Umkm, Konsumen])],
  providers: [CategoryService, UmkmService],
  exports: [CategoryService, UmkmService],
  controllers: [CategoryController],
})
export class CategoryModule {}
