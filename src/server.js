import express from 'express';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import yaml from 'js-yaml';
import fs from 'fs';

// ✅ your routes
import productRoutes from './routes/productRoute.js';
import categoryRoutes from './routes/categoryRoute.js';
import orderRoutes from './routes/orderRoute.js';
import authRoutes from './routes/authRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// logging
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('tiny'));
}

// ✅ Swagger setup
let specs;
try {
  specs = yaml.load(fs.readFileSync('./docs/openapi.yaml', 'utf8'));
} catch (error) {
  console.log('Failed to load OpenAPI specification', error);
  process.exit(1);
}

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// ✅ ROUTES (THIS IS YOUR API)
app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

// ✅ 404 handler (same as your class)
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// ✅ global error handler (same style)
app.use((err, req, res, next) => {
  console.log(err.stack);

  if (!err.status) {
    err.status = 500;
    err.message = 'Internal Server Error';
  }

  res.status(err.status).json({
    error: err.message,
  });
});

// start server
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () =>
    console.log(`Server is running on port ${PORT}`)
  );
}

export default app;