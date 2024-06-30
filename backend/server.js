import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import session from "express-session";
import dotenv from "dotenv";
import connectDB from "./config/database.js";
import passport from "./config/passport.js";
import authRoutes from "./routers/auth.routes.js";
import financeRouter from "./routers/finance.router.js";
import userRoutes from "./routers/user.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET || "secret",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

connectDB();

app.use("/auth", authRoutes);
app.use("/api/finance", financeRouter);
app.use("/api/user", userRoutes);

app.use((req, res) => {
  res.redirect(process.env.CLIENT_ERROR_REDIRECT_URL);
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});

export default app;
