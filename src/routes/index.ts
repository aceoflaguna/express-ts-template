import { Router } from "express";
import healthRoutes from "./health.routes";
import usersRoutes from "./users.routes";

const router = Router();

router.use("/health", healthRoutes);
router.use("/users", usersRoutes);

export default router;
