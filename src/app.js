import express from "express";
import connectDB from "./db/db.connection.js";
import { authRoute } from "./routes/user.routes.js";
const app = express();

app.use(express.json());
connectDB();

app.get("/", (req, res) => {
  res.send("everything working fine..");
});
app.use("/api/auth", authRoute);

export default app;
