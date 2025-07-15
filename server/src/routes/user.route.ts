import { Router } from "express";
import { getAllUsers, getUserById, updateUserDetails } from "../controllers/user.controller";
import { requireAuth, requireRole } from "../middleware";

const router = Router()

router.get("/", requireAuth, requireRole(["admin"]), getAllUsers)
router.get("/:id", requireAuth, getUserById)
router.patch("/:id", requireAuth, updateUserDetails)

export default router;