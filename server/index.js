require('dotenv/config');
const express = require('express');
const staticMiddleware = require('./static-middleware');
const errorMiddleware = require('./error-middleware');
const jsonMiddleware = express.json();
const ClientError = require('./client-error');
const argon2 = require('argon2');
const app = express();
const petfinder = require('@petfinder/petfinder-js');
const client = new petfinder.Client({ apiKey: process.env.PETFINDER_KEY, secret: process.env.PETFINDER_SECRET });
const pg = require('pg');
const jwt = require('jsonwebtoken');
const authorizationMiddleware = require('./authorization-middleware');
const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

app.use(staticMiddleware);
app.use(jsonMiddleware);

app.post('/api/auth/sign-up', (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new ClientError(400, 'username and password are require fields');
  }
  argon2
    .hash(password)
    .then(hashedPassword => {
      const sql = `
        insert into "users" ("username", "hashedPassword", "joinedAt")
          values ($1, $2, now())
          returning "userId", "username", "joinedAt"`;
      const params = [username, hashedPassword];
      db.query(sql, params)
        .then(result => {
          const [user] = result.rows;
          res.status(201).json(user);
        })
        .catch(err => next(err));
    })
    .catch(err => next(err));
});

app.post('/api/auth/sign-in', (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new ClientError(401, 'invalid credentials');
  }
  const sql = `
  select "userId",
         "hashedPassword"
    from "users"
   where "username" = $1`;

  const params = [username];
  db.query(sql, params)
    .then(result => {
      const [user] = result.rows;
      if (!user) {
        throw new ClientError(401, 'invalid login');
      }
      const { userId, hashedPassword } = user;
      return argon2
        .verify(hashedPassword, password)
        .then(isMatching => {
          if (!isMatching) {
            throw new ClientError(401, 'invalid sign in credentials');
          }
          const payload = { userId, username };
          const token = jwt.sign(payload, process.env.TOKEN_SECRET);
          res.json({ token, user: payload });
        });
    })
    .catch(err => next(err));
});

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

app.use(authorizationMiddleware);

app.post('/api/favoritesList', (req, res, next) => {
  const { userId } = req.user;
  const petId = req.body.petId;
  const name = req.body.name;
  const photos = JSON.parse(JSON.stringify(req.body.photos));
  const city = req.body.city;
  const address1 = req.body.address1;
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
  insert into "favoritesList" ("petId", "userId", "name", "photos", "city", "address1", "age", "breed", "size", "gender", "url", "email", "phone", "state", "postcode")
    values($1 ,$2 ,$3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
    returning*
    `;

  const params = [petId, userId, name, photos, city, address1, age, breed, size, gender, url, email, phone, state, postcode];
  db.query(sql, params)
    .then(result => {
      const [animal] = result.rows;
      res.status(201).json(animal);
    })
    .catch(err => { next(err); });
});

app.get('/api/saved', (req, res, next) => {
  const { userId } = req.user;
  if (!userId) {
    throw new ClientError(401, 'invalid credentials');
  }
  const sql = `
  select "petId",
         "userId",
         "name",
         "photos",
         "city",
         "breed",
         "gender",
         "age"
  from "favoritesList"
  where "userId" = $1`;

  const params = [userId];
  db.query(sql, params)
    .then(result => res.json(result.rows))
    .catch(err => next(err));
});

app.get('/api/petdetails/:petId', (req, res, next) => {
  const { userId } = req.user;
  const petId = Number(req.params.petId);
  if (!userId) {
    throw new ClientError(401, 'invalid credentials');
  }
  const sql = `
    select "petId",
            "name",
            "photos",
            "city",
            "address1",
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

app.delete('/api/petdetails/:petId', (req, res, next) => {
  const { userId } = req.user;
  const petId = Number(req.params.petId);
  if (!userId) {
    throw new ClientError(401, 'invalid credentials');
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
