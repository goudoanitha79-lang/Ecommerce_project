require("dotenv").config();

const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();

// Keep this secret in your .env file as JWT_SECRET — never hardcode it in real projects.
const JWT_SECRET = process.env.JWT_SECRET || "dev_secret_change_me";

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// Using a connection pool instead of a single connection — the pool automatically
// opens a fresh connection whenever one drops, instead of dying permanently
// like createConnection() does when the DB host closes an idle connection.
const db = mysql.createPool({
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
  port: process.env.MYSQLPORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Quick check that the pool can actually reach the database at startup.
db.getConnection((err, connection) => {
  if (err) {
    console.error("Database connection failed:", err);
  } else {
    console.log("Database Connected");
    connection.release();
  }
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// ---------- REGISTER ----------
app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).send("Username, email and password are required");
  }

  try {
    // Hash the password with a salt round of 10 — never store plain text passwords.
    const hashedPassword = await bcrypt.hash(password, 10);

    const sql =
      "INSERT INTO users(username, email, password) VALUES (?, ?, ?)";

    db.query(sql, [username, email, hashedPassword], (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Registration failed");
      } else {
        res.send("User Registered");
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Registration failed");
  }
});

// ---------- LOGIN ----------
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send("Email and password are required");
  }

  const sql = "SELECT * FROM users WHERE email = ?";

  db.query(sql, [email], async (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Login failed");
    }

    if (result.length === 0) {
      return res.status(401).send("Invalid Credentials");
    }

    const user = result[0];

    // Compare the plain text password against the stored bcrypt hash.
    const passwordMatches = await bcrypt.compare(password, user.password);

    if (!passwordMatches) {
      return res.status(401).send("Invalid Credentials");
    }

    // Issue a JWT instead of sending back the raw user row (which includes the password hash).
    const token = jwt.sign(
      { id: user.id, email: user.email, username: user.username },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.send({
      token,
      user: { id: user.id, username: user.username, email: user.email }
    });
  });
});

app.get("/users", (req, res) => {
  const sql = "SELECT * FROM users";
  db.query(sql, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/products", (req, res) => {
  const sql = "SELECT * FROM products";
  db.query(sql, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/add-product", upload.single("image"), (req, res) => {
  const { name, price, description } = req.body;
  const image = req.file.filename;
  const sql =
    "INSERT INTO products(name, price, image, description) VALUES (?, ?, ?, ?)";
  db.query(sql, [name, price, image, description], (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send("Product Added");
    }
  });
});

app.put("/update-product/:id", (req, res) => {
  const id = req.params.id;
  const { name, price, description } = req.body;
  const sql =
    "UPDATE products SET name=?, price=?, description=? WHERE id=?";
  db.query(sql, [name, price, description, id], (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send("Product Updated");
    }
  });
});

app.delete("/delete-product/:id", (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM products WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send("Product Deleted");
    }
  });
});

app.listen(5000, () => {
  console.log("Server Running On Port 5000");
});
