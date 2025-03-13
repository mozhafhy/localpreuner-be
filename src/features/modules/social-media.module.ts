import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SocialMedia } from '../entities/social-media.entity';
import { SocialMediaService } from '../services/social-media.service';
import { Konsumen } from 'src/users/entities/konsumen.entity';
import { Umkm } from 'src/users/entities/umkm.entity';
import { SocialMediaController } from '../controllers/social-media.controller';

@Module({
  imports: [TypeOrmModule.forFeature([SocialMedia, Konsumen, Umkm])],
  exports: [SocialMediaService],
  providers: [SocialMediaService],
  controllers: [SocialMediaController],
})
export class SocialMediaModule {}
