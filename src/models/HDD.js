import _ from 'lodash';

import mongoose from 'mongoose';
const { Schema } = mongoose;

const HDDSchema = new Schema({
  vendor: {
    type: String,
    required: true,
  },
  size: {
    type: Number,
    required: true,
  },
  volume: {
    type: String,
    required: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'PC',
    required: true,
  },
}, {
  timestamps: true,
});

HDDSchema.methods.toJSON = function () {
  return _.pick(this, [
    'vendor', 
    'size', 
    'volume', 
  ]);
};

export default mongoose.model('HDD', HDDSchema);