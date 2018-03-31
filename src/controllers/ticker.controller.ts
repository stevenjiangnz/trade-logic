import * as config from 'config';
import * as fs from 'fs';
import * as _ from 'lodash';
import { TickerRepo } from '../repos/ticker.repo';
import { Logger } from '../utils/logger';

export class TickerController {
  conn = config.get('settings.mongoConnection');
  private tr: TickerRepo;
  constructor() {
    this.tr = new TickerRepo();
  }

  public async loadSharesFromDb(shareId, startdate = null, endDate = null) {
    this.tr.connect(this.conn);
    const result = await this.tr.getTickersByShare(shareId, startdate, endDate);
    this.tr.disconnect();

    return result;
  }
}