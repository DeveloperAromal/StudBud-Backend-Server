import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoute from "./routes/auth.route.js";
import userRoute from "./routes/users.route.js";
import fourmRoute from "./routes/fourm.route.js";
import homeworkRoute from "./routes/homework.route.js";
import subdomainRoute from "./routes/subdomain.route.js";
import flashcardRoute from "./routes/flashcard.route.js";
// import countryRoute from "./routes/country.route.js";
import announcementRoute from "./routes/announcement.route.js";
import leaderboardRoute from "./routes/leaderboard.route.js";
import meetRoute from "./routes/zoom.route.js";
import absentesRoute from "./routes/attendance.route.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json({ Status: 200, Active: "True" });
});

app.use("/api/v1", userRoute);
app.use("/api/v1", authRoute);
app.use("/api/v1", fourmRoute);
app.use("/api/v1", homeworkRoute);
app.use("/api/v1", subdomainRoute);
app.use("/api/v1", flashcardRoute);
// app.use("/api/v1", countryRoute);
app.use("/api/v1", announcementRoute);
app.use("/api/v1/", leaderboardRoute);
app.use("/api/v1", meetRoute);
app.use("/api/v1", absentesRoute);

export default app;
