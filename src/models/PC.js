import _ from 'lodash';

import mongoose from 'mongoose';
const { Schema } = mongoose;

const PCSchema = new Schema({
  board: {
    vendor: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    cpu: {
      model: {
        type: String,
        required: true,
      },
      hz: {
        type: Number,
        required: true,
      },
    },
    image: {
      type: String,
      required: true,
    },
    video: {
      type: String,
      required: true,
    },
  },
  ram: {
    vendor: {
      type: String,
      required: true,
    },
    volume: {
      type: Number,
      required: true,
    },
    pins: {
      type: Number,
      required: true,
    },
  },
  os: {
    type: String,
    required: true,
  },
  floppy: {
    type: Number,
    enum: [0, 1],
  },
  monitor: {
    type: String,
  },
  length: {
    type: Number,
    required: true,
  },
  height: {
    type: Number,
    required: true,
  },
  width: {
    type: Number,
    required: true,
  },
  hdd: [{
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
  },],
}, {
  timestamps: true,
});

PCSchema.methods.toJSON = function () {
  return _.pick(this, [
    'board', 
    'ram', 
    'os', 
    'floppy', 
    'monitor', 
    'length', 
    'height', 
    'width',
    'hdd',
  ]);
};

PCSchema.methods.getBoard = function (prop) {
  if (prop) {
    return this.board[prop];
  }

  return _.pick(this.board, [
    'vendor',
    'model',
    'cpu',
    'image',
    'video',
  ]);
};

PCSchema.methods.getRam = function (prop) {
  if (prop) {
    return this.ram[prop];
  }

  return _.pick(this.ram, [
    'vendor',
    'volume',
    'pins',
  ]);
};

PCSchema.methods.getOs = function () {
  return this.os;
};

PCSchema.methods.getHdd = function () {
  return this.hdd;
};

PCSchema.statics.getVolumes = function () {
  this.aggregate([{$group: {_id: '$hdd.volume', size: {$sum: '$hdd.size'}}}],
        function (err, res) {
            if (err) console.log(err);
            return res;

        });
};

// PCSchema.statics.getVolumes = function () {
//   this.aggregate()
//       .unwind("$hdd")
//       .group({_id: '$hdd.volume', size: {$sum: '$hdd.size'}},
//         function (err, res) {
//             if (err) console.log(err);
//             console.log(res);
//             return res;

//         });
// };

export default mongoose.model('PC', PCSchema);