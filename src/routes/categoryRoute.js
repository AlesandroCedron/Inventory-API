import express from 'express';
import {
  getAllCategoriesHandler,
  getCategoryByIdHandler,
  createCategoryHandler,
  updateCategoryHandler,
  deleteCategoryHandler,
} from '../controllers/categoryController.js';

import { authenticate } from '../middleware/authenticate.js';

const router = express.Router();

router.get('/', authenticate, getAllCategoriesHandler);
router.get('/:id', authenticate, getCategoryByIdHandler);
router.post('/', authenticate, createCategoryHandler);
router.put('/:id', authenticate, updateCategoryHandler);
router.delete('/:id', authenticate, deleteCategoryHandler);

export default router;