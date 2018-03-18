import * as config from 'config';
import { UserService } from './user.service';

export class BaseService {
  public baseUrl;
  public token;
  constructor() {
    if (!this.baseUrl) {
      this.baseUrl = config.get('settings.serviceBaseUrl');
    }

    if (!this.token) {
      this.token = (new UserService()).getTokenDefaultUser();
    }
  }

  async getToken() {
    if (!this.token) {
      this.token = await (new UserService()).getTokenDefaultUser();
    }

    return this.token;
  }

  async applyHeaders(options: any) {
    options.headers = {
      'content-type': 'application/json; charset=utf-8',
      'authorization': 'bearer ' + (await this.getToken()).access_token
    }
  }
}