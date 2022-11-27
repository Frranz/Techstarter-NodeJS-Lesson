// use express library to create webserver
const express = require('express');

// instantiate webserver
const app = express();

// define port under which server should be accessible
const port = 3000;

//Requests a random fact about cats from catfact.ninja and sends it to the user
app.get('/catFact', async (request,response) => {
    // make http GET request to catfact.ninja
    const httpResponse = fetch('https://catfact.ninja/fact', {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
    });

    // check if http status code is 200 (ok)
    if (httpResponse.statusCode === 200) {
        // convert http response (string) to json
        const json = await httpResponse.json();
    
        // send back only the cat fact
        response.send(json.fact)
    } else {
        response.send('Fehler beim abrufen der CatFacts');
    }

});

// make server listen to specific port
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});