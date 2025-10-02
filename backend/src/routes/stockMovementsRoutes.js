import express from "express";
import { 
  createStockMovement,
  getStockMovements,
  getStockMovementsByDrink,
  getStockMovementsByUser
} from "../controllers/stockMovementController.js";
import { authenticateToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", authenticateToken, createStockMovement);
router.get("/", authenticateToken, getStockMovements );
router.get("/drink/:id", authenticateToken, getStockMovementsByDrink);
router.get("/user/:id", authenticateToken, getStockMovementsByUser);

export default router;
