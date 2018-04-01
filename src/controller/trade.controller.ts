import * as config from 'config';
import * as _ from 'lodash';
import { IScan } from '../interface/iscan';
import { Logger } from '../utils/logger';

export class TradeController {
  constructor() {
  }

  public analysis(input, scanner: IScan) {
    const result = scanner.scan(input);
  }
}