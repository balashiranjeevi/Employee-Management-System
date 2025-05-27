import express from "express";
import cors from "cors";
import path from "path";
import { adminRouter } from "./Routes/AdminRoute.js";

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT"],
    credentials: true,
  })
);

// ➕ Serve static files
app.use("/images", express.static("public/images"));
app.use(express.json());

app.use("/auth", adminRouter);

app.listen(3000, () => {
  console.log("Server is running");
});
