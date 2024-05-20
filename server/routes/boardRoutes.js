import { Router } from "express";
import {
  createBoard,
  deleteBoard,
  fetchBoard,
} from "../controller/boardController.js";

const router = Router();

router.get("/fetchBoard", fetchBoard);
router.post("/createBoard", createBoard);
router.delete("/deleteBoard", deleteBoard);

export default router;
