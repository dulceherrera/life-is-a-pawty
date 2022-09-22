require('dotenv/config');
const express = require('express');
const staticMiddleware = require('./static-middleware');
const errorMiddleware = require('./error-middleware');
const ClientError = require('./client-error');

const app = express();

const petfinder = require('@petfinder/petfinder-js');
const client = new petfinder.Client({ apiKey: process.env.PETFINDER_KEY, secret: process.env.PETFINDER_SECRET });

app.get('/api/pets/:location/:type', (req, res) => {
  const { location } = req.params;
  const { type } = req.params;
  if (!location || !type) {
    throw new ClientError(400, 'Invalid selection');
  }
  client.animal.search({
    type,
    limit: 5,
    sort: 'random',
    location,
    distance: 20
  })
    .then(response => {
      const animal = response.data.animals[0];
      res.status(200).json(animal);
    })
    .catch(err => {
      console.error(err);
    });
});
app.use(staticMiddleware);

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});
