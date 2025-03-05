import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Konsumen } from './konsumen.entity';
import { KonsumenService } from './konsumen.service';
import { KonsumenController } from './konsumen.controller';
import { Umkm } from '../umkm/umkm.entity';
import { UmkmService } from '../umkm/umkm.service';

@Module({
  imports: [TypeOrmModule.forFeature([Konsumen, Umkm])],
  providers: [KonsumenService, UmkmService],
  controllers: [KonsumenController],
  exports: [KonsumenService, UmkmService],
})
export class KonsumenModule {}
