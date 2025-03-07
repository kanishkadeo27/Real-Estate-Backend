import express from "express";
import {
  shouldBeAdmin,
  shouldBeLoggedIn,
} from "../controllers/testController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const testRouter = express.Router();

// ! should be logged in
testRouter.get("/should-be-logged-in", verifyToken, shouldBeLoggedIn);
// !should be admin
testRouter.get("/should-be-admin", verifyToken, shouldBeAdmin);

export default testRouter;
