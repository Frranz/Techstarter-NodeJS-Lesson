# Techstarter-NodeJS-Lesson
Contains example code for the Techstarter lessons on NodeJS and Databases. 

Repo consists of 4 smaller NodeJS Applications, that can be "live coded", given as homework or used as reference for students future projects. 

## CatFact
A simple Express server that serves a `/catfact` endpoint. Upon request the server retrieves a catfact from the free and public third party API `https://catfact.ninja/fact` and returns the fact as a readable string.

Learnings:
- Creating Simple Express Server
- Creating an endpoint
- Using a third party API

## Feedback
An Express server that serves a simple HTML page with the `<form>` element, where a user can provide feedback. That feedback is sent to the POST endpoint `/saveFeedbackToFile`, where it is appended to a JSON with the current time and a contact email.

Learnings:
- Sending data to the backend in HTML native way
- Processing query parameters with Express
- File & JSON handling

## Guessing Game
A simple Express server with an endpoint to play the classic guessing game. The user has to guess the servers number. Therefore the number and a name is provided as a parameter. The server then checks if the number is corrected and returns the corrosponding message. The endpoint should be accessed with Postman and/or the curl command.

Learning:
- Accessing an API without dedicated interface
- URL paramters
- Sending requests via Postman and/or curl

## SQL Injection
Showcase of a simple SQL Injection in a login-scenario. A login page with a form is given where users can identify themselves with their name and password. Those are checked against a database and if an entry exists they are "logged-in". The program is coded in a way that allows for an SQL-Injection. 

Learnings: 
- Workings of an SQL Injection
- How to prevent SQL Injection


## Todo
- Use express intern body-parser
- Bonus exercise with http://www.omdbapi.com
