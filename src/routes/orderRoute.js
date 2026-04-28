import express from 'express';
import { authenticate } from '../middleware/authenticate.js';
import {
  getAllOrdersHandler,
  getOrderByIdHandler,
  createOrderHandler,
  deleteOrderHandler
} from '../controllers/orderController.js';

const router = express.Router();

router.get('/', authenticate, getAllOrdersHandler);
router.get('/:id', authenticate, getOrderByIdHandler);
router.post('/', authenticate, createOrderHandler);
router.delete('/:id', authenticate, deleteOrderHandler); 

export default router;