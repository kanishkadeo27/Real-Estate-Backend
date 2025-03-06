import express from "express";
import postRouter from "./routes/postRoute.js";
import authRouter from "./routes/authRoute.js";
import cookieParser from "cookie-parser";
const app = express();
const PORT = 8800;

app.use(express.json());
app.use(cookieParser());

app.use("/api/posts", postRouter);
app.use("/api/auth", authRouter);

app.listen(PORT, () => {
  console.log("server is running on port 8800");
});
