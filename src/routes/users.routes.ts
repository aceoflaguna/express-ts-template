import { Router } from "express";
import { listUsers, getUserById, createUser } from "../controllers/users.controller";
import { asyncHandler } from "../middlewares/asyncHandler";

const router = Router();

router.get("/", asyncHandler(listUsers));
router.get("/:id", asyncHandler(getUserById));
router.post("/", asyncHandler(createUser));

export default router;
