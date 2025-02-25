import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Konsumen } from 'src/entities/konsumen.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Konsumen])],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
