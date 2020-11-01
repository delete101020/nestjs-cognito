import { Injectable } from '@nestjs/common';

@Injectable()
export class CognitoConfig {
  public userPoolId: string = process.env.AWS_COGNITO_USER_POOL_ID;
  public clientId: string = process.env.AWS_COGNITO_CLIENT_ID;
  public region: string = process.env.AWS_REGION;
  public authority = `https://cognito-idp.${process.env.AWS_REGION}.amazonaws.com/${process.env.AWS_COGNITO_USER_POOL_ID}`;
}
