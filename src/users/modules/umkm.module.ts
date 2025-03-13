import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Umkm } from '../entities/umkm.entity';
import { UmkmService } from '../services/umkm.service';
import { UmkmController } from '../controllers/umkm.controller';
import { Konsumen } from '../entities/konsumen.entity';
import { Category } from 'src/features/entities/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Umkm, Konsumen, Category])],
  providers: [UmkmService],
  controllers: [UmkmController],
  exports: [UmkmService],
})
export class UmkmModule {}
