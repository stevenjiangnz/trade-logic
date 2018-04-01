import * as config from 'config';
import * as mongoose from 'mongoose';

export const COLLECTION_NAME = 'asx50share';

const shareSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  shareId: Number,
  symbol: String,
  company: String,
  sector: String,
  marketCap: String,
  weight: Number,
});

const ShareDoc = mongoose.model(COLLECTION_NAME, shareSchema, COLLECTION_NAME);
export { ShareDoc };
