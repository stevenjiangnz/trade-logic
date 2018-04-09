import { TickerDoc, COLLECTION_NAME } from './Ticker.schema';
import { BaseRepo } from './base.repo';
import * as mongoose from 'mongoose';
import * as _ from 'lodash';
import { Logger } from '../utils/logger';
import { Ticker } from '../entity/model';

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
    return TickerDoc.find();
  }

  public async removeTickers(ids): Promise<any> {
    return new Promise(async (resolve, reject) => {
      TickerDoc.deleteMany({_id: { $in: ids}}, function(err) {
        this.logger.error(err);
        resolve(null);
      });
    });
  }

  public async getTickersByShare(shareId, startDate = null, endDate = null): Promise<any> {
    const query = {};
    query['shareId'] = shareId;

    if (startDate || endDate) {
      query['tradingDate'] = {};
      if (startDate) {
        query['tradingDate']['$gt'] = startDate;
      }
       if (endDate) {
        query['tradingDate']['$lt'] = endDate;
       }
    }

    return new Promise(async (resolve, reject) => {
      TickerDoc.find(query, (err, result) => {
        if (err) {
          this.logger.info('get error');
          reject(err);
        } else {
          const tickers = [];

          result.forEach(doc => {
            tickers.push(this.getTickerFromDoc(doc));
          });
          this.logger.info('get result', tickers.length);
          resolve(tickers);
        }
      });
    });
  }

  private getTickerFromDoc(doc): Ticker {
    let ticker = new Ticker ();
    ticker =  {
      shareId: doc.shareId,
      symbol: doc.symbol,
      tradingDate: doc.tradingDate,
      open: doc.open,
      close: doc.close,
      high: doc.high,
      low: doc.low,
      ema_10: doc.ema_10,
      ema_20: doc.ema_20,
      sma_5: doc.sma_5,
      sma_10: doc.sma_10,
      sma_30: doc.sma_30,
      sma_50: doc.sma_50,
      sma_200: doc.sma_200,
      bb_20_2_5_m: doc.bb_20_2_5_m,
      bb_20_2_5_h: doc.bb_20_2_5_h,
      bb_20_2_5_l: doc.bb_20_2_5_l,
      adx_di_plus: doc.adx_di_plus,
      adx_di_neg: doc.adx_di_neg,
      adx: doc.adx,
      macd_hist_26_12_9: doc.macd_hist_26_12_9,
      macd_signal_26_12_9: doc.macd_signal_26_12_9,
      macd_26_12_9: doc.macd_26_12_9,
      heikin_open: doc.heikin_open,
      heikin_close: doc.heikin_close,
      heikin_high: doc.heikin_high,
      heikin_low: doc.heikin_low,
      stoch_k: doc.stoch_k,
      stoch_d: doc.stoch_d,
      rsi_6: doc.rsi_6,
      william_14: doc.william_14,
    };
    return ticker;
  }
}