import * as repo from '../repositories/categoryRepo.js';

export const getAllCategories = () => repo.getAll();

export async function getCategoryById(id) {
  const category = await repo.getById(id);
  if (category) return category;

  const err = new Error(`Category ${id} not found`);
  err.status = 404;
  throw err;
}

export function createCategory(data) {
  if (!data.name) {
    const err = new Error('Invalid input');
    err.status = 400;
    throw err;
  }
  return repo.create(data);
}

export async function updateCategory(id, data) {
  const updated = await repo.update(id, data);
  if (updated) return updated;

  const err = new Error(`Category ${id} not found`);
  err.status = 404;
  throw err;
}

export async function deleteCategory(id) {
  const result = await repo.remove(id);
  if (result) return;

  const err = new Error(`Category ${id} not found`);
  err.status = 404;
  throw err;
}