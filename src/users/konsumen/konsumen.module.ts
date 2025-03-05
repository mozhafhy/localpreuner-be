import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Konsumen } from './konsumen.entity';
import { KonsumenService } from './konsumen.service';
import { KonsumenController } from './konsumen.controller';
import { Umkm } from '../umkm/umkm.entity';
import { UmkmService } from '../umkm/umkm.service';
import { JwtAuthGuard } from 'src/guard/jwt-auth.guard';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        global: true,
        secret: configService.get<string>('JWT_KEY'),
        signOptions: {
          expiresIn: '5m',
        },
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([Konsumen, Umkm]),
  ],
  providers: [KonsumenService, UmkmService, JwtAuthGuard],
  controllers: [KonsumenController],
  exports: [KonsumenService, UmkmService, JwtAuthGuard],
})
export class KonsumenModule {}
