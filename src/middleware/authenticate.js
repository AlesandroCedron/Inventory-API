import jwt from 'jsonwebtoken';

export function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    const err = new Error('Unauthorized');
    err.status = 401;
    return next(err);
  }

  try {
    const token = authHeader.startsWith('Bearer ')
      ? authHeader.split(' ')[1]
      : authHeader;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;
    next();
  } catch (error) {
    const err = new Error('Invalid token');
    err.status = 401;
    next(err);
  }
}