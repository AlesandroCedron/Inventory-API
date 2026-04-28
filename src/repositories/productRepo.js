import prisma from '../config/db.js';

export async function getAll() {
  return prisma.product.findMany({
    include: { category: true },
  });
}

export async function getById(id) {
  return prisma.product.findUnique({
    where: { id },
    include: { category: true },
  });
}

export function create(productData) {
  return prisma.product.create({ data: productData });
}

export async function update(id, updatedData) {
  try {
    return await prisma.product.update({
      where: { id },
      data: updatedData,
    });
  } catch (error) {
    if (error.code === 'P2025') return null;
    throw error;
  }
}

export async function remove(id) {
  try {
    return await prisma.product.delete({
      where: { id },
    });
  } catch (error) {
    if (error.code === 'P2025') return null;
    throw error;
  }
}