require('dotenv').config();
const express = require('express');
const cors = require('cors');
const router = require('./app/router');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000' }));

app.use(router);

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
