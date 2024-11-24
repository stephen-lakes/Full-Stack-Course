// import express
const express = require("express");

// creeate a web server
const app = express();

let notes = [
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

// express json parser: gives easy access to data coming in
app.use(express.json());

// GET request to base URL '/'
app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});

// GET request to '/api/note' endpoint
app.get("/api/notes", (request, response) => {
  response.json(notes);
});

// POST request to /api/notes endpoint
app.post("/api/notes", (request, response) => {
  const maxId =
    notes.length > 0 ? Math.max(...notes.map((n) => Number(n.id))) : 0;

  const note = request.body;
  note.id = String(maxId + 1);

  notes = notes.concat(note);

  response.json(note);
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
  notes = notes.filter((note) => note.id !== id);
  response.status(204).end();
});

const PORT = 3001;
// bind the app variable to listen to HTTP requests sent to port 3001
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
