import * as service from '../services/orderService.js';

export async function getAllOrdersHandler(req, res, next) {
  try {
    const orders = await service.getAllOrders();
    res.json(orders);
  } catch (err) {
    next(err);
  }
}

export async function createOrderHandler(req, res, next) {
  try {
    const userId = req.user.id; 
    const order = await service.createOrder(userId, req.body.items);
    res.status(201).json(order);
  } catch (err) {
    next(err);
  }
}

export async function getOrderByIdHandler(req, res, next) {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      const err = new Error('Invalid ID');
      err.status = 400;
      throw err;
    }

    const order = await service.getOrderById(id);

    if (!order) {
      const err = new Error('Order not found');
      err.status = 404;
      throw err;
    }

    res.json(order);
  } catch (err) {
    next(err);
  }
}

export async function deleteOrderHandler(req, res, next) {
  try {
    const id = Number(req.params.id);
    const userId = req.user.id;

    if (isNaN(id)) {
      const err = new Error('Invalid ID');
      err.status = 400;
      throw err;
    }

    const result = await service.deleteOrder(id, userId);

    if (!result) {
      const err = new Error('Order not found');
      err.status = 404;
      throw err;
    }

    res.status(204).send();
  } catch (err) {
    next(err);
  }
}