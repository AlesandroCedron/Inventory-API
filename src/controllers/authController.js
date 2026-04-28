import { signup, login } from '../services/authService.js';

export async function signupHandler(req, res, next) {
  try {
    const user = await signup(req.body);
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
}

export async function loginHandler(req, res, next) {
  try {
    const token = await login(req.body);
    res.status(200).json({ token });
  } catch (err) {
    next(err);
  }
}