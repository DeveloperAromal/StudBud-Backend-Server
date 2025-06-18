import express from "express";
import cors from "cors";
import userRoute from "./routes/users.route.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("StudBud private api");
});

app.use("/api/v1", userRoute);

export default app;
