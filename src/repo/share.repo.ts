import { ShareDoc, COLLECTION_NAME } from './share.schema';
import { BaseRepo } from './base.repo';
import * as mongoose from 'mongoose';
import * as _ from 'lodash';
import { Logger } from '../utils/logger';

export class ShareRepo extends BaseRepo {
  constructor() {
    super();
  }

  public saveAsx50Shares(shareList): Promise<any> {
    return new Promise(async (resolve, reject) => {
      await mongoose.connection.db.listCollections().toArray(async function (err, names) {
        if (_.find(names, n => n.name === COLLECTION_NAME)) {
          await mongoose.connection.db.dropCollection(COLLECTION_NAME, null);
        }
      });

      const shareDocs = [];
      shareList.forEach(s => {
        const sh = new ShareDoc({
          _id: new mongoose.Types.ObjectId(),
          symbol: s.symbol,
          company: s.company,
          marketCap: s.marketCap,
          weight: s.weight,
          sector: s.sector,
          shareId: s.shareId
        });
        shareDocs.push(sh);
      });

      ShareDoc.insertMany(shareDocs, async (error, docs) => {
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


  public async getAsx50Shares(): Promise<any> {
    return ShareDoc.find();
  }
}