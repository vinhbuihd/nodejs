const express = require("express");
const Todo = require("../models/Todo");
const authMiddleware = require("../middleware/auth");
const { body, validationResult } = require("express-validator");

const router = express.Router();

router.get("/", authMiddleware, async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user.id });
    res.json(todos);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching todos", error: error.message });
  }
});

router.post(
  "/",
  authMiddleware,
  [body("title").notEmpty().withMessage("Title is required")],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { title } = req.body;
      const todo = new Todo({ title, user: req.user.id });
      await todo.save();
      res.status(201).json(todo);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error creating todo", error: error.message });
    }
  },
);

router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) return res.status(404).json({ message: "Todo not found" });
    if (todo.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }
    todo.completed = !todo.completed;
    await todo.save();
    res.json(todo);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating todo", error: error.message });
  }
});

router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) return res.status(404).json({ message: "Todo not found" });
    if (todo.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }
    await Todo.findByIdAndDelete(req.params.id);

    res.json({ message: "Todo deleted" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting todo", error: error.message });
  }
});

module.exports = router;
