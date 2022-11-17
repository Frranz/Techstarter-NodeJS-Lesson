// use mysql2 library to access db, use the /promise to get await/async functionality
const mysql = require('mysql2/promise');

// use fs to access files, use .promises to get await/async functionality
const fs = require('fs').promises;


// use express library to create webserver
const express = require('express');
const app = express();

// define port under which server should be accessible
const port = 3000;

// necessary to receive formdata on /saveFeedback
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

// Hello World
app.get('/', (request, response) => {
  response.send('Hello World!');
});

// send HTML file with feedback form
app.get('/feedback', (request,response) => {
  response.sendFile(__dirname + "/index.html");
});

// Endpoint that receives Feedback from form and stores it into a json file
app.post('/saveFeedbackToFile', async (request,response) => {
  // define path for json file
  feedbackPath = __dirname + "/feedbacks.json"

  // get information from html form
  const {mail, feedbackText} = request.body;

  // create new feedback entry
  const newFeedback = {
    mail: mail,
    feedbackText: feedbackText,
    date: new Date(),
  };

  // read json file with feedback
  const feedbacks = await fs.readFile(feedbackPath)

  // parse file contents (string) to json
  const feedbacksJson = JSON.parse(feedbacks);

  // add feedback
  feedbacksJson.push(newFeedback);
  
  // save file
  await fs.writeFile(feedbackPath, JSON.stringify(feedbacksJson))
  
  // send response to user
  response.send("Feedback has been stored to file");
});

// Endpoint that receives Feedback from form and stores it into a json file
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
  const [rows,fields] = await connection.execute('INSERT INTO feedbacks (email,feedback) VALUES (?,?)',[mail,feedbackText]);

  // send response to user
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

  // request recent feedback from database
  const [rows,fields] = await connection.execute('SELECT feedback FROM feedbacks ORDER BY created_at DESC LIMIT 3');

  // extract feedback from each row and put in a list item
  const listRecentFeedback = rows.map(row => `<li> ${row.feedback} </li>`)
                                 .join("");

  // send feedback back to user
  response.send(listRecentFeedback);
});

// make server listen to specific port
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});


