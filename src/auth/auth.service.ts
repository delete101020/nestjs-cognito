import { Inject, Injectable } from '@nestjs/common';
import { CognitoConfig } from '../config/cognito.config';
import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserPool,
  ICognitoUserData,
} from 'amazon-cognito-identity-js';

@Injectable()
export class AuthService {
  private userPool: CognitoUserPool;

  constructor(
    @Inject('CognitoConfig') private readonly cognitoConfig: CognitoConfig,
  ) {
    this.userPool = new CognitoUserPool({
      UserPoolId: this.cognitoConfig.userPoolId,
      ClientId: this.cognitoConfig.clientId,
    });
  }

  async signIn(user: { email: string; password: string }) {
    const { email, password } = user;

    const authenticationDetails = new AuthenticationDetails({
      Username: email,
      Password: password,
    });
    const userData: ICognitoUserData = {
      Username: email,
      Pool: this.userPool,
    };
    const cognitoUser = new CognitoUser(userData);

    return new Promise((resolve, reject) => {
      return cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: result => {
          resolve(result);
        },
        onFailure: err => {
          reject(err);
        },
      });
    });
  }
}
