const express = require('express');

const app = express();
const port = 3000;

// Hello World
app.get('/', (request, response) => {
  response.send('Hello World!');
});

// Debug this (remove an await or change status to statusCode and fuck up url)
app.get('/catFact', async (request,response) => {
    const httpResponse = await fetch('https://catfact.ninja/fact', {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
    });

    if (httpResponse.status === 404) {
        response.send('Fehler beim abrufen der CatFacts');
    }

    const json = await httpResponse.json();
    response.send(json.fact)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});


