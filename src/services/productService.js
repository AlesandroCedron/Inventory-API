import {
  getAll,
  getById,
  create,
  update,
  remove,
} from '../repositories/productRepo.js';

export async function getAllProducts() {
  return getAll();
}

export async function getProductById(id) {
  const product = await getById(id);
  if (product) return product;

  const error = new Error(`Product ${id} not found`);
  error.status = 404;
  throw error;
}

export async function createProduct(data) {
  if (!data.name || !data.price || !data.quantity || !data.categoryId) {
    const error = new Error('Invalid input');
    error.status = 400;
    throw error;
  }

  return create(data);
}

export async function updateProduct(id, data) {
  const updated = await update(id, data);

  if (updated) return updated;

  const error = new Error(`Product ${id} not found`);
  error.status = 404;
  throw error;
}

export async function deleteProduct(id) {
  const result = await remove(id);

  if (result) return;

  const error = new Error(`Product ${id} not found`);
  error.status = 404;
  throw error;
}