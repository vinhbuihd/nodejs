require("dotenv").config();

const express = require("express");
const app = express();
const usersRouter = require("./routes/users");

const PORT = process.env.PORT || 3000;
console.log(`Environment: ${process.env.NODE_ENV}`);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.use((req, res, next) => {
  const time = new Date().toISOString();
  console.log(`[${time}] ${req.method} ${req.url}`);
  next();
});

app.use(express.json());
app.use("/api/users", usersRouter);

app.get("/api/error", (req, res) => {
  throw new Error("Something went wrong!");
});

app.use((err, req, res, next) => {
  console.error("Error:", err.message);
  res.status(500).json({ error: err.message });
});
