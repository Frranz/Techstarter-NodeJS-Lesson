const express = require('express');
const app = express();
const port = 3000;

// Hello World
app.get('/', (request, response) => {
  response.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});


