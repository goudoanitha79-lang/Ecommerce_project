const express = require("express");

const mysql = require("mysql2");

const cors = require("cors");

const multer = require("multer");

const path = require("path");

const app = express();

app.use(cors());

app.use(express.json());

app.use("/uploads", express.static("uploads"));

const db = mysql.createConnection({

  host: "localhost",

  user: "root",

  password: "",

  database: "ecommerce_db"

});

db.connect((err) => {

  if(err) {

    console.log(err);

  } else {

    console.log("Database Connected");

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

const upload = multer({

  storage: storage

});

app.post("/register", (req, res) => {

  const { username, email, password } = req.body;

  const sql =
    "INSERT INTO users(username, email, password) VALUES (?, ?, ?)";

  db.query(

    sql,

    [username, email, password],

    (err, result) => {

      if(err) {

        res.send(err.sqlMessage);

      } else {

        res.send("User Registered");

      }

    }

  );

});

app.post("/login", (req, res) => {

  const { email, password } = req.body;

  const sql =
    "SELECT * FROM users WHERE email = ? AND password = ?";

  db.query(

    sql,

    [email, password],

    (err, result) => {

      if(err) {

        res.send(err);

      } else {

        if(result.length > 0) {

          res.send(result);

        } else {

          res.send("Invalid Credentials");

        }

      }

    }

  );

});

app.get("/users", (req, res) => {

  const sql = "SELECT * FROM users";

  db.query(sql, (err, result) => {

    if(err) {

      res.send(err);

    } else {

      res.send(result);

    }

  });

});

app.get("/products", (req, res) => {

  const sql = "SELECT * FROM products";

  db.query(sql, (err, result) => {

    if(err) {

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

  db.query(

    sql,

    [name, price, image, description],

    (err, result) => {

      if(err) {

        res.send(err);

      } else {

        res.send("Product Added");

      }

    }

  );

});

app.put("/update-product/:id", (req, res) => {

  const id = req.params.id;

  const { name, price, description } = req.body;

  const sql =
    "UPDATE products SET name=?, price=?, description=? WHERE id=?";

  db.query(

    sql,

    [name, price, description, id],

    (err, result) => {

      if(err) {

        res.send(err);

      } else {

        res.send("Product Updated");

      }

    }

  );

});

app.delete("/delete-product/:id", (req, res) => {

  const id = req.params.id;

  const sql = "DELETE FROM products WHERE id = ?";

  db.query(sql, [id], (err, result) => {

    if(err) {

      res.send(err);

    } else {

      res.send("Product Deleted");

    }

  });

});

app.listen(5000, () => {

  console.log("Server Running On Port 5000");

});