import express from 'express';

import {
  getAllProductsHandler,
  getProductByIdHandler,
  createProductHandler,
  updateProductHandler,
  deleteProductHandler,
} from '../controllers/productController.js';

import { authenticate } from '../middleware/authenticate.js';

const router = express.Router();

router.get('/', authenticate, getAllProductsHandler);
router.get('/:id', authenticate, getProductByIdHandler);
router.post('/', authenticate, createProductHandler);
router.put('/:id', authenticate, updateProductHandler);
router.delete('/:id', authenticate, deleteProductHandler);

export default router;