import * as request from 'request-promise-native';
import * as url from 'url';
import { BaseService } from './base.service';

export class ShareService extends BaseService {
  constructor() {
    super();
  }

  public async getShareList() {
    const options = {
        method: 'GET',
        uri: url.resolve(this.baseUrl, 'api/share'),
      };

    await this.applyHeaders(options);
    return request(options);
  }
}