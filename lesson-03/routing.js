const http = require("http");

const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;

  if (url === "/" && method === "GET") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Welcome to the Home Page!");
  } else if (url === "/about" && method === "GET") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("About Us");
  } else if (url === "/contact" && method === "GET") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Contact: hello@example.com");
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("404 Not Found");
  }
});

server.listen(3000, () => {
  console.log("Running at port 3000");
});
