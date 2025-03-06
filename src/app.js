import express from "express";
import connectDB from "./db/db.connection.js";
import { authRoute } from "./routes/user.routes.js";
import { testRoute } from "./routes/test.route.js";
import { adminRoute } from "./routes/admin.route.js";
import { productRoute } from "./routes/product.route.js";

const app = express();

app.use(express.json());
connectDB();

app.get("/", (req, res) => {
  res.send("everything working fine..");
});
app.use("/api/auth", authRoute);
app.use("/api/test", testRoute);
app.use("/api/auth/admin", adminRoute);
app.use("/api/product", productRoute);

export default app;
