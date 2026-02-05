const http = require("http");

const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;

  const users = [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
  ];

  if (url === "/api/users" && method === "GET") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(users));
  } else if (url.startsWith("/api/users/") && method === "GET") {
    const id = url.split("/")[3]; // "1"
    const user = users.find((user) => user.id === Number(id));

    if (user) {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(user));
    } else {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "User not found" }));
    }
  }
});

server.listen(3000, () => {
  console.log("Server is running on port 3000");
});
