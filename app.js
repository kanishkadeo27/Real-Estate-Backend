import express from "express";
import cors from "cors";
import postRouter from "./routes/postRoute.js";
import authRouter from "./routes/authRoute.js";
import testRouter from "./routes/testRoute.js";
import cookieParser from "cookie-parser";
const app = express();
const PORT = 8800;

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/api/posts", postRouter);
app.use("/api/auth", authRouter);
app.use("/api/test", testRouter);

app.listen(PORT, () => {
  console.log("server is running on port 8800");
});
