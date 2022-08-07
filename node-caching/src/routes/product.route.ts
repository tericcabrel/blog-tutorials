import { Router } from 'express';
import { createProduct, findAllProducts, searchProducts } from '../controllers/product.controller';

const productRoute = () => {
  const router = Router();

  router.post('/products', createProduct);

  router.get('/products', findAllProducts);

  router.get('/products/search', searchProducts);

  return router;
};

export { productRoute };
