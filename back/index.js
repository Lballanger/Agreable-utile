require('dotenv').config();
const express = require('express');
const router = require('./app/router');

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('test');
});

app.use(router);

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
