import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";

// app config
const app = express();
const PORT = 4000;

//middleware
app.use(express.json());
app.use(cors());

// db connection

connectDB();

// api endpoints
app.use("/api/food", foodRouter);

app.get("/", (req, res) => {
  res.send("API Working");
});

app.listen(PORT, () => {
  console.log(`Server Started on http://localhost:${PORT}`);
});

// mongodb+srv://NIMESH939:120488@cluster0.n5jhs.mongodb.net/?
