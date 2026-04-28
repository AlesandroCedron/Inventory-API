import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../config/db.js';

export async function signup({ email, password }) {
  if (!email || !password) {
    const err = new Error('Invalid input');
    err.status = 400;
    throw err;
  }

  const existing = await prisma.user.findUnique({ where: { email } });

  if (existing) {
    const err = new Error('Email already in use');
    err.status = 409;
    throw err;
  }

  const hashed = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: { email, password: hashed },
  });

  return { id: user.id, email: user.email };
}

export async function login({ email, password }) {
  if (!email || !password) {
    const err = new Error('Invalid input');
    err.status = 400;
    throw err;
  }

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    const err = new Error('Invalid credentials');
    err.status = 401;
    throw err;
  }

  const valid = await bcrypt.compare(password, user.password);

  if (!valid) {
    const err = new Error('Invalid credentials');
    err.status = 401;
    throw err;
  }

  const token = jwt.sign(
    { id: user.id },
    process.env.JWT_SECRET
  );

  return token;
}