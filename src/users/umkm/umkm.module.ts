import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Umkm } from './umkm.entity';
import { OtpModule } from 'src/utils/otp/otp.module';
import { UmkmService } from './umkm.service';
import { UmkmController } from './umkm.controller';
// import { KonsumenModule } from '../konsumen/konsumen.module';
import { Konsumen } from '../konsumen/konsumen.entity';
import { Post } from './posts/post.entitiy';

@Module({
  imports: [TypeOrmModule.forFeature([Umkm, Konsumen, Post]), OtpModule],
  providers: [UmkmService],
  controllers: [UmkmController],
  exports: [UmkmService],
})
export class UmkmModule {}
