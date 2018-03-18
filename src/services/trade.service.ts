import * as request from 'request-promise-native';
import { BaseService } from './base.service';

export class TradeService extends BaseService {
  constructor() {
    super();
  }

  public getToke() {
    const options = {
      uri: 'http://www.google.com',
      transform: function (body) {
        return body;
      }
    };

    request(options).then((body) => {
      // console.log('returned result:   ', body);
    }).catch((err) => {
      // console.log('err details:  ', err);
    });

    return 'token';
  }
}

