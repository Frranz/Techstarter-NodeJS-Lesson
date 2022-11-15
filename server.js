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

// Debug this (remove an await or change status to statusCode or fuck up url)
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

// irgendwas mit einer sehr langen if mit vielen ors und eins failed
app.get('/catFact', async (request,response) => {
  
});

// irgendwas das unterschied zwischen == und === gut zeigt
// parameter übergeben und mit zahl vergleichen
// schlechtes beispiel? Weil eher encouraged nur == zu nehmen? 
app.get('/guessingGame', async (request,response) => {
  let {name, number}  = request.query;

  const secretNumber = 5;

  let result = "";
  if (number === secretNumber) {
    result = "richtig. Herzlichen Glückwunsch";
  } else {
    result = "falsch. Versuch es noch einmal";
  }

  const message = `Teilnehmer ${name} hat auf die Zahl ${number} getippt. Die Zahl ist ` + result;

  response.send(message);
})

// irgenwas in textfile/db reinschreiben und direkt wieder abrufen

// irgendwas mit split oder so wo es einen array index zu früh abcuttet


// send HTML file with feedback form
app.get('/feedback', (request,response) => {
  response.sendFile(__dirname + "/index.html");
});

app.post('/saveFeedbackToFile', async (request,response) => {
  // define path for file with feedback
  feedbackPath = __dirname + "/feedbacks.json"

  // get information from html form
  const {mail, feedbackText} = request.body;

  // create new feedback entry
  const newFeedback = {
    mail: mail,
    feedbackText: feedbackText,
    date: new Date(),
  };

  // complete from here on
  // load json file with feedback
  // add feedback and save file
  const feedbacks = await fs.readFile(feedbackPath)
  const feedbacksJson = JSON.parse(feedbacks);

  feedbacksJson.push(newFeedback);
  await fs.writeFile(feedbackPath, JSON.stringify(feedbacksJson))
  response.send("Feedback has been stored to file");
});

// save feedback to mysql
// do additional task to retrieve feedback => teach dangers of sqlinjection
app.post('/saveFeedbackToDb', async (request,response) => {
  // get information from html form
  const {mail, feedbackText} = request.body;

  // establish database connection
  var connection = await mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "my-secret-pw",
    database: "NodeIntro"
  });
  
  // save to database
  const [rows,fields] = await connection.execute('INSERT INTO feedback (email,feedback) VALUES (?,?)',[mail,feedbackText]);

  // send response back
  response.send("Feedback has been stored to database");
});

// Endpoint that shows 10 most recent feedbacks
app.get('/showRecentFeedback', async (request,response) => {
  // establish database connection
  var connection = await mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "my-secret-pw",
    database: "NodeIntro"
  });

  // save to database
  const [rows,fields] = await connection.execute('SELECT feedback FROM feedbacks ORDER BY created_at DESC LIMIT 3');

  // extract feedback from each row and put in a list item
  const listRecentFeedback = rows.map(row => `<li> ${row.feedback} </li>`)
                                 .join("");

  // send response back
  response.send(listRecentFeedback);
});

// irgendwas mit url parameters
// http://www.omdbapi.com/?s=action&apikey=3a1ff7ce&
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});


