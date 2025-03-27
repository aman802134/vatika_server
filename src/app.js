import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./db/db.connection.js";
import { authRoute } from "./routes/user.routes.js";
import { testRoute } from "./routes/test.route.js";
import { adminRoute } from "./routes/admin.route.js";
import { productRoute } from "./routes/product.route.js";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
connectDB();

app.get("/", (req, res) => {
  res.send("everything working fine..");
});
app.use("/api/auth", authRoute);
app.use("/api/auth", testRoute);
app.use("/api/auth/dashboard", adminRoute);
app.use("/api/product", productRoute);

export default app;
