import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

function computeStatus(drink) {
  if (drink.quantity === 0) return "esgotado";
  if (drink.quantity <= (drink.minQuantity ?? 0)) return "fazer_pedido";
  return "ok";
}

export async function getDrinks(req, res) {
  try {
    const page = Math.max(1, Number(req.query.page || 1));
    const limit = Math.max(1, Number(req.query.limit || 100));
    const skip = (page - 1) * limit;
    const { category, status } = req.query;

    const where = {};
    if (category) where.category = category;

    const drinks = await prisma.drink.findMany({
      where,
      skip,
      take: limit,
      orderBy: { name: "asc" },
    });

    const enriched = drinks.map(d => ({ ...d, status: computeStatus(d) }));
    const filtered = status ? enriched.filter(d => d.status === status) : enriched;

    res.json({ page, limit, total: filtered.length, data: filtered });
  } catch (error) {
    console.error("getDrinks error:", error);
    res.status(500).json({ error: "Erro ao buscar bebidas" });
  }
}

export async function getDrinkById(req, res) {
  try {
    const id = Number(req.params.id);
    const drink = await prisma.drink.findUnique({ where: { id } });
    if (!drink) return res.status(404).json({ error: "Bebida não encontrada" });

    const result = { ...drink, status: computeStatus(drink) };
    res.json(result);
  } catch (error) {
    console.error("getDrinkById error:", error);
    res.status(500).json({ error: "Erro ao buscar bebida" });
  }
}

export async function createDrink(req, res) {
  try {
    const { name, category, unit, size, price, quantity = 0, minQuantity = 0 } = req.body;

    if (!name) return res.status(400).json({ error: "Campo 'name' é obrigatório" });

    const newDrink = await prisma.drink.create({
      data: {
        name,
        category,
        unit,
        size,
        price: price != null ? Number(price) : undefined,
        quantity: Number(quantity),
        minQuantity: Number(minQuantity),
      },
    });

    res.status(201).json({ ...newDrink, status: computeStatus(newDrink) });
  } catch (error) {
    console.error("createDrink error:", error);
    res.status(500).json({ error: "Erro ao criar bebida" });
  }
}

export async function updateDrink(req, res) {
  try {
    const id = Number(req.params.id);
    const { name, category, unit, size, price, quantity, minQuantity } = req.body;

    const data = {};
    if (name !== undefined) data.name = name;
    if (category !== undefined) data.category = category;
    if (unit !== undefined) data.unit = unit;
    if (size !== undefined) data.size = size;
    if (price !== undefined) data.price = Number(price);
    if (quantity !== undefined) data.quantity = Number(quantity);
    if (minQuantity !== undefined) data.minQuantity = Number(minQuantity);

    const updated = await prisma.drink.update({
      where: { id },
      data,
    });

    res.json({ ...updated, status: computeStatus(updated) });
  } catch (error) {
    console.error("updateDrink error:", error);
    if (error.code === "P2025") return res.status(404).json({ error: "Bebida não encontrada" });
    res.status(500).json({ error: "Erro ao atualizar bebida" });
  }
}

export async function deleteDrink(req, res) {
  try {
    const id = Number(req.params.id);
    await prisma.drink.delete({ where: { id } });
    res.json({ message: "Bebida removida com sucesso" });
  } catch (error) {
    console.error("deleteDrink error:", error);
    if (error.code === "P2025") return res.status(404).json({ error: "Bebida não encontrada" });
    res.status(500).json({ error: "Erro ao deletar bebida" });
  }
}

export async function adjustQuantity(req, res) {
  try {
    const id = Number(req.params.id);
    const { delta } = req.body;
    if (typeof delta !== "number") return res.status(400).json({ error: "Envie 'delta' numérico" });

    const drink = await prisma.drink.findUnique({ where: { id } });
    if (!drink) return res.status(404).json({ error: "Bebida não encontrada" });

    const nova = drink.quantity + delta;
    if (nova < 0) return res.status(400).json({ error: "Ajuste inválido, quantidade ficaria negativa" });

    const updated = await prisma.drink.update({
      where: { id },
      data: { quantity: { increment: delta } },
    });

    res.json({ ...updated, status: computeStatus(updated) });
  } catch (error) {
    console.error("adjustQuantity error:", error);
    if (error.code === "P2025") return res.status(404).json({ error: "Bebida não encontrada" });
    res.status(500).json({ error: "Erro ao ajustar quantidade" });
  }
}
