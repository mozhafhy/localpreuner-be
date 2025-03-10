import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Umkm } from './entities/umkm.entity';
import { UmkmService } from './umkm.service';
import { UmkmController } from './umkm.controller';
import { Konsumen } from '../konsumen/entities/konsumen.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Umkm, Konsumen])],
  providers: [UmkmService],
  controllers: [UmkmController],
  exports: [UmkmService],
})
export class UmkmModule {}
