require('dotenv/config');
const express = require('express');
const staticMiddleware = require('./static-middleware');
const errorMiddleware = require('./error-middleware');
const jsonMiddleware = express.json();
const ClientError = require('./client-error');

const app = express();

const petfinder = require('@petfinder/petfinder-js');
const client = new petfinder.Client({ apiKey: process.env.PETFINDER_KEY, secret: process.env.PETFINDER_SECRET });
const pg = require('pg');
const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

app.use(staticMiddleware);
app.use(jsonMiddleware);

app.get('/api/matches/:location/:type', (req, res, next) => {
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

app.get('/api/petdetails/:petId', (req, res, next) => {
  const petId = Number(req.params.petId);
  if (!petId) {
    throw new ClientError(400, 'petId must be a positive integer');
  }
  const sql = `
    select "petId",
            "name",
            "photos",
            "location",
            "breed",
            "age",
            "gender",
            "size",
            "url",
            "email",
            "phone",
            "state",
            "postcode"
       from "favoritesList"
      where "petId"=$1`;

  const params = [petId];
  db.query(sql, params)
    .then(result => {
      const selectedPet = result.rows[0];
      if (!selectedPet) {
        throw new ClientError(404, `Cannot find pet with petId ${petId}`);
      }
      res.json(selectedPet);
    })
    .catch(err => {
      console.error(err);
    });
});

app.get('/api/saved', (req, res, next) => {
  const sql = `
  select "petId",
         "userId",
         "name",
         "photos",
         "location",
         "breed",
         "gender",
         "age"
  from "favoritesList"`;

  db.query(sql)
    .then(result => res.json(result.rows))
    .catch(err => {
      console.error(err);
    });
});

app.post('/api/favoritesList', (req, res, next) => {
  const petId = req.body.petId;
  const userId = 1;
  const name = req.body.name;
  const photos = JSON.parse(JSON.stringify(req.body.photos));
  const location = req.body.location;
  const age = req.body.age;
  const breed = req.body.breed;
  const size = req.body.size;
  const gender = req.body.gender;
  const url = req.body.url;
  const email = req.body.email;
  const phone = req.body.phone;
  const state = req.body.state;
  const postcode = req.body.postcode;

  const sql = `
  insert into "favoritesList" ("petId", "userId", "name", "photos", "location", "age", "breed", "size", "gender", "url", "email", "phone", "state", "postcode")
    values($1 ,$2 ,$3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
    returning*
    `;

  const params = [petId, userId, name, photos, location, age, breed, size, gender, url, email, phone, state, postcode];
  return db.query(sql, params)
    .then(result => {
      const [animal] = result.rows;
      res.status(201).json(animal);
    })
    .catch(err => {
      console.error(err);
    });
});

app.delete('/api/petdetails/:petId', (req, res, next) => {
  const petId = Number(req.params.petId);
  if (!petId) {
    throw new ClientError(400, 'petId must be a positive integer');
  }

  const sql = `
  delete from "favoritesList"
        where "petId"= $1
        returning * `;

  const params = [petId];
  db.query(sql, params)
    .then(result => {
      const [deletePet] = result.rows;
      if (!deletePet) {
        throw new ClientError(404, `Cannot find pet with petId ${petId}`);
      } else {
        res.sendStatus(204);
      }
    })
    .catch(err => {
      console.error(err);
    });

});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});
