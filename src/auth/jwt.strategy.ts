import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { passportJwtSecret } from 'jwks-rsa';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { CognitoConfig } from '../config/cognito.config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject('CognitoConfig') private readonly cognitoConfig: CognitoConfig,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromHeader('authorization'),
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `${cognitoConfig.authority}/.well-known/jwks.json`,
      }),
      audience: cognitoConfig.clientId,
      issuer: cognitoConfig.authority,
      algorithms: ['RS256'],
    });
  }

  public async validate(payload: any) {
    return payload;
  }
}
