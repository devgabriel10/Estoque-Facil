import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getProducts(req, res) {
  try {
    const products = await prisma.product.findMany();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar produtos" });
  }
}

export async function getProductById(req, res) {
  const { id } = req.params;
  try {
    const product = await prisma.product.findUnique({
      where: { id: Number(id) },
    });
    if (!product) return res.status(404).json({ error: "Produto não encontrado" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar produto" });
  }
}

export async function createProduct(req, res) {
  const { name, description, price, quantity } = req.body;

  if (!name || price == null) {
    return res.status(400).json({ error: "Nome e preço são obrigatórios" });
  }

  try {
    const product = await prisma.product.create({
      data: {
        name,
        description,
        price: parseFloat(price),
        quantity: quantity ? Number(quantity) : 0,
      },
    });
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: "Erro ao criar produto" });
  }
}

export async function updateProduct(req, res) {
  const { id } = req.params;
  const { name, description, price, quantity } = req.body;

  try {
    const product = await prisma.product.update({
      where: { id: Number(id) },
      data: {
        name,
        description,
        price: price != null ? parseFloat(price) : undefined,
        quantity: quantity != null ? Number(quantity) : undefined,
      },
    });
    res.json({ message: "Produto atualizado com sucesso", product });
  } catch (error) {
    res.status(400).json({ error: "Erro ao atualizar produto" });
  }
}

export async function deleteProduct(req, res) {
  const { id } = req.params;
  try {
    await prisma.product.delete({ where: { id: Number(id) } });
    res.json({ message: "Produto deletado com sucesso" });
  } catch (error) {
    res.status(400).json({ error: "Erro ao deletar produto" });
  }
}
