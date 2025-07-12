import { Router } from "express"
import { register, login, getUser } from "../controllers/auth.controller"
import { requireAuth } from "../middleware"

const router = Router()

router.post("/register", register)
router.post("/login", login)
router.get("/user", requireAuth, getUser)

export default router