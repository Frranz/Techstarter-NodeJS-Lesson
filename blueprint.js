const mysql = require('mysql2/promise');
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;

const app = express();
const port = 3000;

// necessary to receive formdata on /saveFeedback
app.use(bodyParser.urlencoded({ extended: true }));

// Hello World
app.get('/', (request, response) => {
  response.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});


