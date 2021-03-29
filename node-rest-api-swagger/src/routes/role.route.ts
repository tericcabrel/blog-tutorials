import { Router } from 'express';
import { createRole, deleteRole, getAllRoles, getRole, updateRole } from '../controllers/role.controller';

const roleRoute = () => {
  const router = Router();

  router.post('/roles', createRole);

  router.get('/roles', getAllRoles);

  router.get('/roles/:id', getRole);

  router.put('/roles/:id', updateRole);

  router.delete('/roles/:id', deleteRole);

  return router;
};

export { roleRoute };
