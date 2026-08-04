require("dotenv").config();

const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const multer = require("multer");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Cloudinary
const { v2: cloudinary } = require("cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const app = express();

const JWT_SECRET = process.env.JWT_SECRET || "dev_secret_change_me";

app.use(cors());
app.use(express.json());

const db = mysql.createPool({
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
  port: process.env.MYSQLPORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

db.getConnection((err, connection) => {
  if (err) {
    console.error("Database connection failed:", err);
  } else {
    console.log("Database Connected");
    connection.release();
  }
});

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "ecommerce-products",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
  },
});

const upload = multer({ storage });
// ---------------- REGISTER ----------------

app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).send("Username, email and password are required");
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const sql =
      "INSERT INTO users(username,email,password) VALUES (?,?,?)";

    db.query(sql, [username, email, hashedPassword], (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Registration failed");
      }

      res.send("User Registered");
    });

  } catch (err) {
    console.error(err);
    res.status(500).send("Registration failed");
  }
});

// ---------------- LOGIN ----------------

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

    const passwordMatches = await bcrypt.compare(password, user.password);

    if (!passwordMatches) {
      return res.status(401).send("Invalid Credentials");
    }

    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
        email: user.email,
      },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.send({
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    });
  });
});

// ---------------- USERS ----------------

app.get("/users", (req, res) => {
  db.query("SELECT * FROM users", (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }

    res.send(result);
  });
});

// ---------------- PRODUCTS ----------------

app.get("/products", (req, res) => {
  db.query("SELECT * FROM products", (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }

    res.send(result);
  });
});

// ---------------- ADD PRODUCT ----------------

app.post("/add-product", upload.single("image"), (req, res) => {
  const { name, price, description } = req.body;

  if (!req.file) {
    return res.status(400).send("Image is required");
  }

  // Cloudinary image URL
  const image = req.file.path;

  const sql =
    "INSERT INTO products(name, price, image, description) VALUES (?, ?, ?, ?)";

  db.query(sql, [name, price, image, description], (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Failed to add product");
    }

    res.send("Product Added");
  });
});

// ---------------- UPDATE PRODUCT ----------------

app.put("/update-product/:id", (req, res) => {
  const { id } = req.params;
  const { name, price, description } = req.body;

  const sql =
    "UPDATE products SET name=?, price=?, description=? WHERE id=?";

  db.query(sql, [name, price, description, id], (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Failed to update product");
    }

    res.send("Product Updated");
  });
});

// ---------------- DELETE PRODUCT ----------------

app.delete("/delete-product/:id", (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM products WHERE id = ?", [id], (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Failed to delete product");
    }

    res.send("Product Deleted");
  });
});
// ---------------- START SERVER ----------------

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server Running On Port ${PORT}`);
});
