import { Router } from 'express';
import UsersRoutes from './components/users/users.routes';

export default () => {
  const router = Router();

  router.use('/users', new UsersRoutes().router);

  return router;
};
