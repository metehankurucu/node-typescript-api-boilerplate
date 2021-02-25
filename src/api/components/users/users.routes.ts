import { Router } from 'express';
import Container from 'typedi';
import { validateBody } from '../../middlewares/validate.middleware';
import { ComponentRoutes } from '../../../interfaces';
import UsersController from './users.controller';
import { CreateUserDTO } from './interfaces/user.interface';
import wrapAsync from '../../middlewares/wrap-async.middleware';

class UsersRoutes implements ComponentRoutes<UsersController> {
  router: Router = Router();

  readonly controller: UsersController;

  constructor() {
    this.controller = Container.get(UsersController);
    this.registerRoutes();
  }

  registerRoutes = () => {
    this.router.get('/', wrapAsync(this.controller.getUsers));
    this.router.post('/', validateBody(CreateUserDTO), wrapAsync(this.controller.createUser));
    this.router.get('/:id', wrapAsync(this.controller.getUser));
  };
}

export default UsersRoutes;
