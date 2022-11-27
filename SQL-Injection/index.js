// use mysql2 library to access db, use the /promise to get await/async functionality
const mysql = require('mysql2/promise');

// use express library to create webserver
const express = require('express');
const app = express();

// define port under which server should be accessible
const port = 3000;

// necessary to receive formdata on /saveFeedback
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

// send HTML file with feedback form
app.get('/login', (request,response) => {
  response.sendFile(__dirname + '/login.html');
});

// Endpoint that receives Feedback from form and stores it into a json file
app.post('/checkLogin', async (request,response) => {
  // get information from html form
  const {username, password} = request.body;

  // establish database connection
  var connection = await mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'my-secret-pw',
    database: 'sql_injection'
  });
  
  // save to database
  const [rows,fields] = await connection.execute(
    "SELECT * FROM users WHERE username='?' AND password='?'",
    [username, password]  
  );

  if (rows.length > 0) {
    // user-pw correct

    /**
     * Here actual logging in would happen, by e.g. setting a cookie 
     */

    response.send(`You are now logged in`);
  } else {
    // user-pw incorrect
    response.send('Wrong combination of password and username, try again')
  }
});

// make server listen to specific port
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
  