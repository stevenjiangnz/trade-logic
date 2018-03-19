import * as config from 'config';
import * as mongoose from 'mongoose';

const shareSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  biography: String
});

const ShareDoc = mongoose.model('Share', shareSchema)
export { ShareDoc };
