import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Konsumen } from './konsumen.entity';
import { KonsumenService } from './konsumen.service';

@Module({
  imports: [TypeOrmModule.forFeature([Konsumen])],
  providers: [KonsumenService],
  exports: [KonsumenService],
})
export class KonsumenModule {}
