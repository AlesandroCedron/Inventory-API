import prisma from '../config/db.js';

export function getAll() {
  return prisma.category.findMany();
}

export function getById(id) {
  return prisma.category.findUnique({ where: { id } });
}

export function create(data) {
  return prisma.category.create({ data });
}

export async function update(id, data) {
  try {
    return await prisma.category.update({
      where: { id },
      data,
    });
  } catch (e) {
    if (e.code === 'P2025') return null;
    throw e;
  }
}

export async function remove(id) {
  try {
    return await prisma.category.delete({
      where: { id },
    });
  } catch (e) {
    if (e.code === 'P2025') return null;
    throw e;
  }
}