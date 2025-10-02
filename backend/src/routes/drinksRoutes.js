import express from "express";
import {
  getDrinks,
  getDrinkById,
  createDrink,
  updateDrink,
  deleteDrink,
  adjustQuantity,
} from "../controllers/drinksController.js";
import { authenticateToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", authenticateToken, getDrinks);
router.get("/:id", authenticateToken, getDrinkById);
router.post("/", authenticateToken, createDrink);
router.put("/:id", authenticateToken, updateDrink);
router.delete("/:id", authenticateToken, deleteDrink);
router.post("/:id/adjust", authenticateToken, adjustQuantity);

export default router;
