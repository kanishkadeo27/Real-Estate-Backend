import express from "express";

const postRouter = express.Router();

postRouter.get("/test", (req, res) => {
  console.log("router works");
  res.send("it works");
});

// ! create a post-post
postRouter.post("/", (req, res) => {
  res.send("it works");
});
// !fetch all posts-get
postRouter.get("/", (req, res) => {
  res.send("it works");
});
// !fetch single post-get
postRouter.get("/:postId", (req, res) => {
  res.send("it works");
});
// !update single post-get
postRouter.put("/:postId", (req, res) => {
  res.send("it works");
});
// !delete single post-get
postRouter.delete("/:postId", (req, res) => {
  res.send("it works");
});

export default postRouter;
