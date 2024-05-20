import { Router } from "express";
import {
  createList,
  fetchLists,
  createTask,
  editTask,
  deleteTask,
  deleteList,
} from "../controller/listController.js";

const router = Router();

router.get("/fetchList", fetchLists);
router.post("/createList", createList);
router.post("/createTask", createTask);
router.patch("/editTask", editTask);
router.delete("/deleteTask", deleteTask);
router.delete("/deleteList", deleteList);

export default router;
