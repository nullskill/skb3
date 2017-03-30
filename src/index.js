import express from 'express';
import cors from 'cors';
import fetch from 'isomorphic-fetch';
import mongoose from 'mongoose';
import Promise from 'bluebird';

import device from './routes/device';
import saveDataInDb from './saveDataInDb';

mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/pc');

// import fetchPC from './fetchPC';
const pcUrl = 'https://gist.githubusercontent.com/isuvorov/ce6b8d87983611482aac89f6d7bc0037/raw/pc.json';

let pc = {};

const app = express();
app.use(cors());
app.use('/pc', device);

app.listen(3000, () => {
  console.log('App is listening on port 3000');

  fetch(pcUrl)
  .then(async (res) => {
    const data = await res.json();
    pc = await saveDataInDb(data);
  })
  .catch(err => {
    console.log('Чтото пошло не так:', err);
    throw(err);
  });
});