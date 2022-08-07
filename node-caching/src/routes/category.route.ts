import { Router } from 'express';
import { createCategory, findAllCategories } from '../controllers/category.controller';

const categoryRoute = () => {
  const router = Router();

  router.post('/categories', createCategory);

  router.get('/categories', findAllCategories);

  return router;
};

export { categoryRoute };
