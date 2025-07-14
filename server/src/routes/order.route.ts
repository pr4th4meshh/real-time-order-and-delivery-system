import { Router } from "express";
import { acceptOrder, getOrders, placeOrder, updateStatus } from "../controllers/order.controller";
import { requireAuth, requireRole } from "../middleware";

const router= Router()

router.post('/place-order', requireAuth, requireRole(["customer"]), placeOrder)
router.get('/', requireAuth, requireRole(["customer", "partner", "admin"]), getOrders)
router.patch('/:id', requireAuth, requireRole(["customer", "partner"]), updateStatus)
router.patch('/:id/accept', requireAuth, requireRole(["partner"]), acceptOrder)

export default router;