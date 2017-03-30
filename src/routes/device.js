import express from 'express';
// import cors from 'cors';
import ok from 'okay';

import vendor from './vendor';
import PC from './../models/PC';

let router = express.Router();
// router.use();

// let dbUri = 'mongodb://localhost/pc';
// let dbConnection = mongoose.createConnection(dbUri);

// function goToVendor(req, res, next) {
//   console.log(req.params.device);
//   return next();
// }

// router.use('/:device(board|ram|hdd)/vendor', vendor);

// router.get('/:device(board|ram|hdd)/vendor', (req, res, next) => {
//   PC.findOne({}, ok(next, (item) => {
//     res.send(item.getVendor(req.params.device));
//   }));
// });

router.get('/', (req, res, next) => {
  // PC.find({}, ok(next, (pcs) => {
  //   res.send(pcs);
  // }))
  PC.findOne({}, [
    'board', 
    'ram', 
    'os', 
    'floppy', 
    'monitor', 
    'length', 
    'height', 
    'width',
    'hdd.vendor',
    'hdd.size',
    'hdd.volume'
  ], ok(next, (item) => {
    res.send(item);
  }));
});

router.get('/board/:prop?', (req, res, next) => {
  PC.findOne({}, ok(next, (item) => {
    const result = item.getBoard(req.params.prop);
    if (result === undefined) return res.status(404).send('Not Found');
    res.send(JSON.stringify(result));
  }));
});

router.get('/ram/:prop?', (req, res, next) => {
  PC.findOne({}, ok(next, (item) => {
    const result = item.getRam(req.params.prop);
    if (result === undefined) return res.status(404).send('Not Found');
    res.send(JSON.stringify(result));
  }));
});

router.get('/os/:prop?', (req, res, next) => {
  PC.findOne({}, ok(next, (item) => {
    const result = item.getOs(req.params.prop);
    if (result === undefined) return res.status(404).send('Not Found');
    res.send(JSON.stringify(result));
  }));
});

router.get('/hdd', (req, res, next) => {
  PC.findOne({}, [
    'hdd.vendor',
    'hdd.size',
    'hdd.volume'
  ], ok(next, (item) => {
    res.send(item.getHdd());
  }));
});

router.get('/volumes', (req, res, next) => {
  res.send(PC.getVolumes());
});

module.exports = router;