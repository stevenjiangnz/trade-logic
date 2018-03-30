import { TickerDoc, COLLECTION_NAME } from './Ticker.schema';
import { BaseRepo } from './base.repo';
import * as mongoose from 'mongoose';
import * as _ from 'lodash';
import { Logger } from '../utils/logger';

export class TickerRepo extends BaseRepo {
  constructor() {
    super();
  }

  public saveTickers(TickerList): Promise<any> {
    return new Promise(async (resolve, reject) => {

      const tickerDocs = [];
      TickerList.forEach(t => {
        const tk = new TickerDoc({
          shareId: t.shareId,
          symbol: t.symbol,
          tradingDate: t.tradingDate,
          open: t.open,
          close: t.close,
          high: t.high,
          low: t.low,
          ema_10: t.ema_10,
          ema_20: t.ema_20,
          sma_5: t.sma_5,
          sma_10: t.sma_10,
          sma_30: t.sma_30,
          sma_50: t.sma_50,
          sma_200: t.sma_200,
          bb_20_2_5_m: t.bb_20_2_5_m,
          bb_20_2_5_h: t.bb_20_2_5_h,
          bb_20_2_5_l: t.bb_20_2_5_l,
          adx_di_plus: t.adx_di_plus,
          adx_di_neg: t.adx_di_neg,
          adx: t.adx,
          macd_hist_26_12_9: t.macd_hist_26_12_9,
          macd_signal_26_12_9: t.macd_signal_26_12_9,
          macd_26_12_9: t.macd_26_12_9,
          heikin_open: t.heikin_open,
          heikin_close: t.heikin_close,
          heikin_high: t.heikin_high,
          heikin_low: t.heikin_low,
          stoch_k: t.stoch_k,
          stoch_d: t.stoch_d,
          rsi_6: t.rsi_6,
          william_14: t.william_14,
        });
        tickerDocs.push(tk);
      });

      TickerDoc.collection.createIndex({shareId: 1, tradingDate: 1}, null );

      TickerDoc.insertMany(tickerDocs, async (error, docs) => {
        if (error) {
          this.logger.error('Error insert docs', error);
          reject(error);
        } else {
          this.logger.info('Success insert docs');
          resolve(docs);
        }
      });

    });
  }


  public async getAsx50Tickers(): Promise<any> {
    return TickerDoc.find()
  }

  public async removeTickers(ids): Promise<any> {
    return new Promise(async (resolve, reject) => {
      TickerDoc.deleteMany({_id: { $in: ids}}, function(err) {
        console.log(err);
        resolve(null);
      });
    });
  }
}