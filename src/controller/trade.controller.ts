import * as config from 'config';
import * as _ from 'lodash';
import { IScan } from '../interface/iscan';
import { Logger } from '../utils/logger';
import { TickerController } from '../controller/ticker.controller'


export class TradeController {
  constructor() {
  }

  public analysis(input, scanner: IScan) {
    const result = scanner.scan(input);
    return result;
  }

  public async analysisByShare(shareId, scanner: IScan, startDate = null, endDate= null) {
    const tc = new TickerController();
    const tickerList = await tc.loadSharesFromDb(shareId, startDate, endDate);
    const result = scanner.scan(tickerList);
    return result;
  }

  public async analysisByShareList(shareIds, scanner: IScan, startDate = null, endDate= null) {
  }

}