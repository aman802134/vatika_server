import express from "express";
import cors from "cors";
import { config } from "./src/config/config.js";
import { connectDB } from "./src/db/db.connection.js";
import { userRouter } from "./src/routes/userRoute.js";
import { uploadRouter } from "./src/routes/uploadRoute.js";
import { productRouter } from "./src/routes/productRoute.js";

const app = express();
const PORT = config.port || 3000;
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());

connectDB();
app.get("/", (req, res) => {
  res.send("everything is fine");
});

app.use("/auth", userRouter);
app.use("/upload", uploadRouter);
app.use("/product", productRouter);

app.listen(PORT, () => {
  console.log(`server connected on port ${PORT}`);
});
