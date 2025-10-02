import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function createStockMovement(req, res) {
  try {
    const { drinkId, delta, type = "manual", reference } = req.body;
    const userId = req.user && (req.user.id ?? req.user.userId ?? null);

    if (typeof drinkId !== "number" || typeof delta !== "number") {
      return res.status(400).json({ error: "Envie 'drinkId' (number) e 'delta' (number)" });
    }

    const result = await prisma.$transaction(async (tx) => {
      const drink = await tx.drink.findUnique({ where: { id: drinkId } });
      if (!drink) throw new Error("DRINK_NOT_FOUND");

      const novaQuantidade = drink.quantity + delta;
      if (novaQuantidade < 0) throw new Error("NEGATIVE_QUANTITY");

      const updatedDrink = await tx.drink.update({
        where: { id: drinkId },
        data: { quantity: { increment: delta } },
      });

      const movement = await tx.stockMovement.create({
        data: {
          drinkId,
          userId: userId ?? undefined,
          delta,
          type,
          reference,
        },
      });

      return { updatedDrink, movement };
    });

    return res.status(201).json({
      message: "Movimento registrado com sucesso",
      drink: result.updatedDrink,
      movement: result.movement,
    });
  } catch (err) {
    console.error("createStockMovement error:", err);
    if (err.message === "DRINK_NOT_FOUND") return res.status(404).json({ error: "Bebida não encontrada" });
    if (err.message === "NEGATIVE_QUANTITY") return res.status(400).json({ error: "Ajuste inválido: quantidade ficaria negativa" });
    if (err.code === "P2025") return res.status(404).json({ error: "Bebida não encontrada" });
    return res.status(500).json({ error: "Erro ao registrar movimento de estoque" });
  }
}

export async function getStockMovements(req, res) {
  try {
    const { drinkId, userId, type, dateFrom, dateTo } = req.query;
    const page = Math.max(1, Number(req.query.page || 1));
    const limit = Math.max(1, Number(req.query.limit || 50));
    const skip = (page - 1) * limit;

    const where = {};
    if (drinkId) where.drinkId = Number(drinkId);
    if (userId) where.userId = Number(userId);
    if (type) where.type = type;
    if (dateFrom || dateTo) {
      where.createdAt = {};
      if (dateFrom) where.createdAt.gte = new Date(dateFrom);
      if (dateTo) where.createdAt.lte = new Date(dateTo);
    }

    const movements = await prisma.stockMovement.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
      include: { drink: true, user: { select: { id: true, name: true, email: true } } },
    });

    res.json({ page, limit, data: movements });
  } catch (err) {
    console.error("listStockMovements error:", err);
    res.status(500).json({ error: "Erro ao listar movimentos de estoque" });
  }
}

export async function getStockMovementsByDrink(req, res) {
  try {
    const { id } = req.params;
    const movements = await prisma.stockMovement.findMany({
      where: { drinkId: Number(id) },
      include: { drink: true, user: true },
      orderBy: { createdAt: "desc" }
    });

    res.json(movements);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar movimentações por bebida", details: error.message });
  }
}

export async function getStockMovementsByUser(req, res) {
  try {
    const { id } = req.params;
    const movements = await prisma.stockMovement.findMany({
      where: { userId: Number(id) },
      include: { drink: true, user: true },
      orderBy: { createdAt: "desc" }
    });

    res.json(movements);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar movimentações por usuário", details: error.message });
  }
}
