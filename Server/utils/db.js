import mysql from "mysql";

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "ems",
});
con.connect((err) => {
  if (err) {
    console.log("Error connecting to the database:", err);
  } else {
    console.log("Connected to the database");
  }
});

export default con;
