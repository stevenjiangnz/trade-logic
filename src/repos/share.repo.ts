import { ShareDoc } from './share.schema';
import { BaseRepo } from './base.repo';
import * as mongoose from 'mongoose';
import * as config from 'config';

export class ShareRepo extends BaseRepo {
  constructor() {
    super();
  }

  public saveShare(): Promise<any> {
    const conn = config.get('settings.mongoConnection');

    return new Promise(async (resolve, reject) => {
      await mongoose.connect(conn);

      await mongoose.connection.db.dropCollection('asx50shares', null);
      const sh = new ShareDoc({
        _id: new mongoose.Types.ObjectId(),
        code: 'name value',
        company: 'biography value ' + new Date().toLocaleTimeString()
      });

      sh.save(async function (err) {
        resolve(null);
        await mongoose.disconnect();
      });

      // try {

      //   mongoose.connect(conn).then(function (err) {
      //     console.log('connection done...', err);

      //     const sh = new ShareDoc({
      //       _id: new mongoose.Types.ObjectId(),
      //       name: 'name value',
      //       biography: 'biography value'
      //     });

      //     sh.save(function (err) {
      //       console.log('save done...', err);
      //       resolve(null);
      //       mongoose.disconnect();
      //     });

      //   });
      // } catch (err) {
      //   console.log('connection err', err);
      //   reject(err);
      // }

    });

    // mongoose.connect(conn, function (err) {
    //   if (err) throw err;

    //   console.log('connection done');
    // });
  }
}