import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import authRoutes from "./routers/auth.routes.js";
import financeRouter from "./routers/finance.router.js";
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());
dotenv.config();

const PORT = process.env.PORT || 7000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("mongodb connected");
    app.listen(PORT, () => {
      console.log(`server is running on PORT ${PORT}`);
    });
  })
  .catch((err) => console.log("Mongodb connection error", err));

app.use("/api/auth", authRoutes);
app.use("/api/finance", financeRouter);
