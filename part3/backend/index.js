// import Node's web server module
const http = require("http");

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

// create a new web server
// register an event handler that is called every time an HTTP request
// is made to the server's address http://localhost:3001
// the request is responded to with the status code 200 and
// set the Content-Type to text/plain and the content of the site to be returned set to Hello World
const app = http.createServer((request, response) => {
  response.writeHead(200, { "Content-type": "text/plain" });
  response.end("Hello World");
});

const PORT = 3001;
// bind the app variable to listen to HTTP requests sent to port 3001
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
