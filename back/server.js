require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors({ origin: "*" }));

const SECRET_KEY = "see";
const bcrypt = require("bcrypt");

const users = [];

//Register
app.post("/register", async (req, res) => {
  const { name, password } = req.body;

  if (!name || !password) {
    return res.status(400).json({ error: "Name and password are required!" });
  }

  const existingUser = users.find((user) => user.name === name);
  if (existingUser) {
    return res.status(400).json({ error: "Username already exists!" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      id: Date.now().toString(),
      name,
      password: hashedPassword,
    };
    users.push(newUser);
    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Error hashing password" });
  }
});

// Login
app.post("/login", async (req, res) => {
  const { name, password } = req.body;

  const user = users.find((u) => u.name === name);
  if (!user) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  // Compare password with hashed password
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const token = jwt.sign({ userId: user.id, name: user.name }, SECRET_KEY, {
    expiresIn: "1h",
  });

  res.json({ token });
});

app.get("/users", (req, res) => {
  res.json(users);
});

const PORT = 9003;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
