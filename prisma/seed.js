import bcrypt from 'bcrypt';
import 'dotenv/config';
import { PrismaClient } from '../src/generated/prisma/client.js';
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.$executeRawUnsafe(`
    TRUNCATE "OrderProduct", "Order", "Product", "Category", "User"
    RESTART IDENTITY CASCADE;
  `);

  const password = await bcrypt.hash('Password123!', 10);

  const admin = await prisma.user.create({
    data: {
      email: 'admin@example.com',
      password,
    },
  });

  const user = await prisma.user.create({
    data: {
      email: 'user@example.com',
      password,
    },
  });

  const electronics = await prisma.category.create({
    data: { name: 'Electronics' },
  });

  const books = await prisma.category.create({
    data: { name: 'Books' },
  });

  const laptop = await prisma.product.create({
    data: {
      name: 'Laptop',
      price: 1200,
      quantity: 10,
      categoryId: electronics.id,
    },
  });

  const phone = await prisma.product.create({
    data: {
      name: 'Phone',
      price: 800,
      quantity: 15,
      categoryId: electronics.id,
    },
  });

  const book = await prisma.product.create({
    data: {
      name: 'Book',
      price: 20,
      quantity: 50,
      categoryId: books.id,
    },
  });

  await prisma.order.create({
    data: {
      userId: admin.id,
      items: {
        create: [
          { productId: laptop.id, quantity: 1 },
          { productId: phone.id, quantity: 2 },
        ],
      },
    },
  });

  await prisma.order.create({
    data: {
      userId: user.id,
      items: {
        create: [
          { productId: book.id, quantity: 3 },
        ],
      },
    },
  });

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error('Seed failed:', e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());