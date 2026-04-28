import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../services/productService.js';

export async function getAllProductsHandler(req, res, next) {
  try {
    const products = await getAllProducts();
    res.status(200).json(products);
  } catch (err) {
    next(err);
  }
}

export async function getProductByIdHandler(req, res, next) {
  try {
    const id = parseInt(req.params.id);
    const product = await getProductById(id);
    res.status(200).json(product);
  } catch (err) {
    next(err);
  }
}

export async function createProductHandler(req, res, next) {
  try {
    const product = await createProduct(req.body);
    res.status(201).json(product);
  } catch (err) {
    next(err);
  }
}

export async function updateProductHandler(req, res, next) {
  try {
    const id = parseInt(req.params.id);
    const updated = await updateProduct(id, req.body);
    res.status(200).json(updated);
  } catch (err) {
    next(err);
  }
}

export async function deleteProductHandler(req, res, next) {
  try {
    const id = parseInt(req.params.id);
    await deleteProduct(id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}