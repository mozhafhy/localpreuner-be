import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Konsumen } from 'src/users/konsumen.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { EmailModule } from 'src/email/email.module';
import { JwtModule } from '@nestjs/jwt';
import { KonsumenModule } from 'src/users/konsumen.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule, // if not global, import it here
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_KEY'),
        signOptions: { expiresIn: '60s' },
      }),
      inject: [ConfigService],
    }),

    TypeOrmModule.forFeature([Konsumen]),
    KonsumenModule,
    // EmailModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
