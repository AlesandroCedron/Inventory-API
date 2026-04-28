import prisma from '../config/db.js';

export function getAllOrders() {
  return prisma.order.findMany({
    select: {
      id: true,
      date: true,
      items: {
        select: {
          quantity: true,
          product: {
            select: {
              id: true,
              name: true,
              price: true,
            },
          },
        },
      },
    },
  });
}

export async function createOrder(userId, items) {
  return prisma.order.create({
    data: {
      userId,
      items: {
        create: items.map(item => ({
          productId: item.productId,
          quantity: item.quantity,
        })),
      },
    },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  });
}

export function getOrderById(id) {
  return prisma.order.findUnique({
    where: { id },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  });
}

export async function deleteOrder(id, userId) {
  const order = await prisma.order.findUnique({
    where: { id },
  });

  if (!order) return null;

  if (order.userId !== userId) {
    const err = new Error('Forbidden');
    err.status = 403;
    throw err;
  }

  await prisma.orderProduct.deleteMany({
    where: { orderId: id },
  });

  await prisma.order.delete({
    where: { id },
  });

  return true;
}