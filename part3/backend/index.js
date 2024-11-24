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

app.get("/api/notes/:id", (request, response) => {
  const id = request.params.id;
  const note = notes.find((note) => note.id === id);

  if (note) {
    response.json(note);
  } else {
    response.status(404).end();
  }
  response.json(note);
});

app.delete("/api/notes/:id", (request, response) => {
  const id = request.params.id;
  const notes = notes.filter((note) => note.id !== id);
  response.status(204).end();
});

const PORT = 3001;
// bind the app variable to listen to HTTP requests sent to port 3001
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
