import { Router } from "express"
import {
  createPartner,
  deletePartner,
  getAllPartners,
  getPartnerById,
  updatePartnerRole,
} from "../controllers/partner.controller"
import { requireAuth, requireRole } from "../middleware"

const router = Router()

router.get("/", requireAuth, requireRole(["admin"]), getAllPartners)
router.get("/:id", requireAuth, requireRole(["admin"]), getPartnerById)
router.post("/", requireAuth, requireRole(["admin"]), createPartner)
router.patch("/:id", requireAuth, requireRole(["admin"]), updatePartnerRole)
router.delete("/:id", requireAuth, requireRole(["admin"]), deletePartner)

export default router
