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
      const TickerDocs = [];
      TickerList.forEach(s => {
        const sh = new TickerDoc({
          _id: new mongoose.Types.ObjectId(),
          symbol: s.symbol,
          company: s.company,
          marketCap: s.marketCap,
          weight: s.weight,
          sector: s.sector,
          TickerId: s.TickerId
        });
        TickerDocs.push(sh);
      });

      TickerDoc.insertMany(TickerDocs, async (error, docs) => {
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
}