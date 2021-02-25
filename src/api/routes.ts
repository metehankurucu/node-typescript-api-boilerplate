import { Router } from 'express';
import AuthRoutes from './components/auth/auth.routes';
import UsersRoutes from './components/users/users.routes';

export default () => {
  const router = Router();

  router.use('/auth', new AuthRoutes().router);
  router.use('/users', new UsersRoutes().router);

  return router;
};
