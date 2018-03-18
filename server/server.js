require('./config/config');
const express = require('express');

const port = process.env.PORT || 3000;
const app = express();

app.use('/search', require('./routes/searchRouter'));

app.listen(port, () => {
  console.log(`Server listening on ${port}`);
});
