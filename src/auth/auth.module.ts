import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { CognitoConfig } from '../config/cognito.config';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [PassportModule.register({})],
  controllers: [AuthController],
  providers: [AuthService, CognitoConfig, JwtStrategy],
})
export class AuthModule {}
