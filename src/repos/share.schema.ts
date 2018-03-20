import * as config from 'config';
import * as mongoose from 'mongoose';

const shareSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  shareID: Number,
  code: String,
  company: String,
  sector: String,
  makertCap: String,
  weight: Number,
});

const ShareDoc = mongoose.model('asx50share', shareSchema)
export { ShareDoc };
