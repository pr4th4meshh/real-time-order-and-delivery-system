import { Router } from "express";
import { getAllUsers, getUserById } from "../controllers/user.controller";
import { requireAuth, requireRole } from "../middleware";

const router = Router()

router.get("/", requireAuth, requireRole(["admin"]), getAllUsers)
router.get("/:id", requireAuth, getUserById)

export default router;