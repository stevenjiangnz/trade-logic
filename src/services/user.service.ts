import * as request from 'request-promise-native';
import * as param from 'jquery-param';
import * as config from 'config';
import {BaseService} from './base.service';
import * as url from 'url';

export class UserService {
  private baseUrl;
  constructor() {
    if (!this.baseUrl) {
      this.baseUrl = config.get('settings.serviceBaseUrl');
    }
  }

  public getToke(username: string, password: string) {
    const options = {
      method: 'POST',
      uri: url.resolve(this.baseUrl, './oauth/token'),
      headers: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      body: param({
        username,
        password,
        grant_type: 'password'
      }),
      json: true,
    };

    return request(options);
  }

  public getTokenDefaultUser() {
    const username = config.get('settings.serviceAccount.username');
    const password = config.get('settings.serviceAccount.password');

    return this.getToke(username, password);
  }
}

