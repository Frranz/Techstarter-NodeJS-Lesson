// use express library to create webserver
const express = require('express');

// instantiate webserver
const app = express();

// define port under which server should be accessible
const port = 3000;

/**
 * On this endpoint the user guesses a number as URL parameter 
 * If the number matches the secretNumber the user is notified
 * that they won the game
 */
 app.get('/guessingGame', async (request,response) => {
    // retrieve URL parameters
    let {name, number}  = request.query;
  
    // define secret number
    const secretNumber = 5;
  
    // check if the number is correct and set result message accordingly
    let result = "";
    if (number === secretNumber) {
      result = "richtig. Herzlichen Glückwunsch";
    } else {
      result = "falsch. Versuch es noch einmal";
    }
  
    // concatenate response message
    const message = `Teilnehmer ${name} hat auf die Zahl ${number} getippt. Die Zahl ist ` + result;

    // send response message to user
    response.send(message);
  })

// make server listen to specific port
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});


