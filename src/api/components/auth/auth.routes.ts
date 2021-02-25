import { Router } from 'express';
import Container from 'typedi';
import wrapAsync from '../../middlewares/wrap-async.middleware';
import AuthController from './auth.controller';
import { ComponentRoutes } from '../../../interfaces/index';
import { LoginUserDTO } from './interfaces/auth.interface';
import { validateBody } from '../../middlewares/validate.middleware';

class AuthRoutes implements ComponentRoutes<AuthController> {
  router: Router = Router();

  readonly controller: AuthController;

  constructor() {
    this.controller = Container.get(AuthController);
    this.registerRoutes();
  }

  registerRoutes = () => {
    this.router.post('/login', validateBody(LoginUserDTO), wrapAsync(this.controller.login));
  };
}

export default AuthRoutes;
