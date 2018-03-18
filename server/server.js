require('./config/config');
const express = require('express');

const connect = require('./db/connect');

const port = process.env.PORT || 3000;
const app = express();

connect('RecentSearches')
  .then(db => {
    // Middleware for db
    app.use((req, res, next) => {
      req.db = db;
      next();
    });

    app.use('/search', require('./routes/searchRouter'));
    app.use('/recent/', require('./routes/recentSearchesRouter'));

    app.listen(port, () => {
      console.log(`Server listening on ${port}`);
    });
  })
  .catch(e => console.log(e));
