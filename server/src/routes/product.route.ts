import { Router } from "express";
import { createProduct, deleteProduct, getProductById, getProducts, updateProduct } from "../controllers/product.controller";
import { requireAuth, requireRole } from "../middleware";

const router = Router();

router.get("/all", requireAuth, getProducts);
router.get("/:id", requireAuth, getProductById);
router.post("/create", requireAuth, requireRole(["admin"]), createProduct);
router.patch("/:id", requireAuth, requireRole(["admin"]), updateProduct);
router.delete("/:id", requireAuth, requireRole(["admin"]), deleteProduct);

export default router;