import { JwtStrtegy } from './streategy/jwt.strategy';
import { UsersModule } from './../users/users.module';
import { LocalStrategy } from './streategy/local.strategy';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwt } from './constants';

@Module({
  imports: [
    PassportModule,
    UsersModule,
    JwtModule.register({
      secret: jwt.secreateKey,
      signOptions: {
        expiresIn: '10h',
      },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrtegy],
  controllers: [AuthController],
})
export class AuthModule {}
