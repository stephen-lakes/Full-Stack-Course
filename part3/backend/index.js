// import express
const express = require("express");

// creeate a web server
const app = express();

const notes = [
  {
    id: "1",
    content: "HTML is easy",
    imortant: true,
  },
  {
    id: "2",
    content: "Browser can execute only javascript",
    imortant: false,
  },
  {
    id: "3",
    content: "GET and POST are the most important methids of HTTP protocol",
    imortant: true,
  },
];

// GET request to base URL '/'
app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});

// GET request to '/api/note' endpoint
app.get("/api/notes", (request, response) => {
  response.json(notes);
});

const PORT = 3001;
// bind the app variable to listen to HTTP requests sent to port 3001
app.listen(PORT);
console.log(`Server running on port ${PORT}`);

// The event handler function accepts 2 parameters
// The request and the response parameters
// The request parameter contains all information about the HTTP request
// The repsonse parameter is used to define how the request is responded to
