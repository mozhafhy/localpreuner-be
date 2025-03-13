import { Module } from '@nestjs/common';
import { Category } from '../entities/category.entity';
import { CategoryService } from '../services/category.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Umkm } from '../../users/entities/umkm.entity';
import { UmkmService } from 'src/users/services/umkm.service';
import { Konsumen } from 'src/users/entities/konsumen.entity';
import { CategoryController } from '../controllers/category.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Category, Umkm, Konsumen])],
  providers: [CategoryService, UmkmService],
  exports: [CategoryService, UmkmService],
  controllers: [CategoryController],
})
export class CategoryModule {}
