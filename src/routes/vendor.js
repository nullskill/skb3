import express from 'express';
import mongoose from 'mongoose';
// import Promise from 'bluebird';
import ok from 'okay';

import PC from './../models/PC';

let router = express.Router();

// mongoose.Promise = Promise;
// mongoose.connect('mongodb://localhost/pc');

// let dbUri = 'mongodb://localhost/pc';
// let dbConnection = mongoose.createConnection(dbUri);


router.get('/', (req, res, next) => {
 res.send(req.baseUrl);
});

module.exports = router;