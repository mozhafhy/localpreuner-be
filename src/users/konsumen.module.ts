import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Konsumen } from './konsumen.entity';
import { KonsumenService } from './konsumen.service';
import { KonsumenController } from './konsumen.controller';
import { OtpModule } from 'src/utils/otp/otp.module';

@Module({
  imports: [TypeOrmModule.forFeature([Konsumen]), OtpModule],
  providers: [KonsumenService],
  controllers: [KonsumenController],
  exports: [KonsumenService],
})
export class KonsumenModule {}
