import * as config from 'config';
import { Logger } from '../utils/logger';
import * as mongoose from 'mongoose';

export class BaseRepo {
  public logger: any;
  constructor() {
    this.logger = new Logger();
    mongoose.Promise = Promise;
  }

  public async connect(conn) {
    if (mongoose.connection && mongoose.connection.readyState !== 1) {
      this.logger.debug('About to connect to mongo.')
      await mongoose.connect(conn);
    }
  }

  public async disconnect() {
    if (mongoose.connection && mongoose.connection.readyState === 1) {
      this.logger.debug('About to disconnect from mongo.')
      await mongoose.disconnect();
    }
  }

}