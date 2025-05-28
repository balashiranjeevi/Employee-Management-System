import express from "express";
import con from "../utils/db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs"; // Corrected typo: bycrypt -> bcrypt
import multer from "multer";
import path from "path";

const router = express.Router();

// Configure multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images"); // save images in this folder
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // unique file name
  },
});

const upload = multer({ storage });

router.post("/adminlogin", (req, res) => {
  const sql = "SELECT * FROM admin WHERE email = ? AND password = ?";
  con.query(sql, [req.body.email, req.body.password], (err, result) => {
    if (err) return res.json({ loginStatus: false, Error: "Query Error" });
    if (result.length > 0) {
      const email = result[0].email;
      const token = jwt.sign(
        { role: "admin", email: email },
        "jwt_secret_key",
        { expiresIn: "1d" }
      );
      res.cookie("token", token);
      return res.json({ loginStatus: true });
    } else {
      return res.json({ loginStatus: false, Error: "Invalid Credentials" });
    }
  });
});

router.get("/category", (req, res) => {
  const sql = "SELECT * FROM category";
  con.query(sql, (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" });
    return res.json({ Status: true, Result: result });
  });
});

router.post("/add_category", (req, res) => {
  const sql = "INSERT INTO category (name) VALUES (?)";
  con.query(sql, [req.body.category], (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" });
    return res.json({ Status: true });
  });
});

router.post("/add_employee", upload.single("image"), (req, res) => {
  // Log request body and file to debug
  console.log("req.body:", req.body);
  console.log("req.file:", req.file);

  // Check if image file was uploaded
  if (!req.file) {
    return res.json({ Status: false, Error: "No image file uploaded." });
  }

  // Use req.file.filename for the image path
  const imagePath = req.file.filename;

  const sql =
    "INSERT INTO employee (name, email, password, salary, address, image, category_id) VALUES (?)";

  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) {
      console.error("Bcrypt hashing error:", err);
      return res.json({ Status: false, Error: "Bcrypt Hashing Error" });
    }

    const values = [
      req.body.name,
      req.body.email,
      hash,
      req.body.salary,
      req.body.address,
      imagePath, // Use the filename provided by multer
      req.body.category_id, // <--- CORRECTED THIS LINE! Use category_id from req.body
    ];

    // Log values before query to debug
    console.log("Values for SQL query:", values);

    con.query(sql, [values], (err, result) => {
      if (err) {
        console.error("Database Query Error:", err); // Log the actual DB error
        return res.json({ Status: false, Error: "Query Error" });
      }
      return res.json({ Status: true });
    });
  });
});


router.get("/employee", (req, res) => {
  const sql = "SELECT * FROM employee";
  con.query(sql, (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" });
    return res.json({ Status: true, Result: result });
  });
});

export { router as adminRouter };
