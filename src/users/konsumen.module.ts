import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Konsumen } from './konsumen.entity';
import { KonsumenService } from './konsumen.service';
import { KonsumenController } from './konsumen.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Konsumen])],
  providers: [KonsumenService],
  controllers: [KonsumenController],
  exports: [KonsumenService],
})
export class KonsumenModule {}
