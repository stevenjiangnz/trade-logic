import * as request from 'request-promise-native';
import * as config from 'config';
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
        json: true,
      };

    await this.applyHeaders(options);
    return request(options);
  }

  public async getTickerWithIndicator(shareId, startDate = null, endDate = null): Promise<any> {
    if (!startDate) {
      startDate = config.get('settings.indicator.loadStartDate');
    }

    if (!endDate) {
      endDate = config.get('settings.indicator.loadEndDate');
    }

    const indicatorString = config.get('settings.indicator.indicatorsToLoad');

    const urlString = `api/ticker?id=${shareId}&start=${startDate}&end=${endDate}&indicator=${indicatorString}`;

    const options = {
      method: 'GET',
      uri: url.resolve(this.baseUrl, urlString),
      json: true,
    };

    await this.applyHeaders(options);
    return request(options);
  }
}