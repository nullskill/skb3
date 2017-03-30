import express    from 'express';
import bodyParser from 'body-parser';
import cors       from 'cors';
import mongoose   from 'mongoose';
import Promise    from 'bluebird';

import saveDataInDb from './saveDataInDb';
import Pet          from './models/Pet';
import User         from './models/User';
import isAdmin      from './middleware/isAdmin';

mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/skb3');

const app = express();
app.use(bodyParser.json());
app.use(cors());
// app.use(isAdmin);

app.get('/clear', isAdmin, async (req, res) => {
  await User.remove({});
  await Pet.remove({});

  return res.send('OK');
});

app.get('/users', async (req, res) => {
  const users = await User.find();
  return res.json(users);
});

app.get('/pets', async (req, res) => {
  const pets = await Pet.find().populate('owner');
  return res.json(pets);
});

app.post('/data', async (req, res) => {
  const data = req.body;
  if (!data.user) return res.status(400).send('user required');
  if (!data.pets) data.pets = [];

  const user = await User.findOne({
    name: data.user.name,
  });
  if (user) return res.status(400).send(`user.name ${user.name} already exists`);

  try {
    const result = await saveDataInDb(data);
    return res.json(result);
  } catch(e) {
    console.log(e);
    return res.status(500).json(e);
  }

});

app.listen(3000, () => {
  console.log('App is listening on port 3000');
});