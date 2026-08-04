// ---------- LOGIN ----------
require("dotenv").config();

const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express(); {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send("Email and password are required");
  }

  const sql = "SELECT * FROM users WHERE email = ?";

  db.query(sql, [email], async (err, result) => {
    if (err) {
      console.error("Database Error:", err);
      return res.status(500).send("Login failed");
    }

    console.log("Entered Email:", email);
    console.log("Database Result:", result);

    if (result.length === 0) {
      console.log("User not found");
      return res.status(401).send("Invalid Credentials");
    }

    const user = result[0];

    console.log("Entered Password:", password);
    console.log("Stored Hash:", user.password);

    const passwordMatches = await bcrypt.compare(password, user.password);

    console.log("Password Match:", passwordMatches);

    if (!passwordMatches) {
      return res.status(401).send("Invalid Credentials");
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        username: user.username,
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
