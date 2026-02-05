const express = require("express");
const app = express();

const users = [
  { id: 1, name: "Alice", email: "alice@example.com" },
  { id: 2, name: "Bob", email: "bob@example.com" },
  { id: 3, name: "Charlie", email: "charlie@example.com" },
];

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello from Express!");
});

app.get("/api/users", (req, res) => {
  res.json(users);
});

app.get("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const user = users.find((user) => user.id === id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

app.post("/api/users", (req, res) => {
  const { name, email } = req.body;
  const newUser = {
    id: users.length + 1,
    name,
    email,
  };
  users.push(newUser);
  res.status(201).json(newUser);
});

app.put("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const user = users.find((user) => user.id === id);

  if (user) {
    const { name, email } = req.body;

    user.name = name || user.name;
    user.email = email || user.email;

    res.json(user);
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

app.delete("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const user = users.find((user) => user.id === id);

  if (user) {
    const index = users.indexOf(user);
    users.splice(index, 1);

    res.status(200).json({ message: "User deleted" });
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
