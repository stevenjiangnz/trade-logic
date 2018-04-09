import * as _ from 'lodash';

export class TickerHelper {
  public static GetIndex(input, tradingDate, start = null) {
    return _.findIndex(input, {tradingDate: tradingDate}, start)
  }
}