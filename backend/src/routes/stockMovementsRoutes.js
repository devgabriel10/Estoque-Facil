import express from "express";
import { createStockMovement, listStockMovements } from "../controllers/stockMovementController.js";
import { authenticateToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", authenticateToken, createStockMovement);
router.get("/", authenticateToken, listStockMovements);

export default router;
