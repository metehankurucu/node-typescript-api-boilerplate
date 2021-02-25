import { Router } from 'express';
import Container from 'typedi';
import { validateBody } from '../../middlewares/validate.middleware';
import { ComponentRoutes } from '../../../interfaces';
import UsersController from './users.controller';
import { CreateUserDTO } from './interfaces/user.interface';
import wrapAsync from '../../middlewares/wrap-async.middleware';
import verifyAuth from '../../middlewares/verify-auth.middleware';
import verifyAccess from '../../middlewares/verify-access.middleware';
import { AdminRoles } from '../../../constants';

class UsersRoutes implements ComponentRoutes<UsersController> {
  router: Router = Router();

  readonly controller: UsersController;

  constructor() {
    this.controller = Container.get(UsersController);
    this.registerRoutes();
  }

  registerRoutes = () => {
    // Get All Users
    this.router.get('/', verifyAuth, verifyAccess(AdminRoles), wrapAsync(this.controller.getUsers));
    // Create User
    this.router.post('/', validateBody(CreateUserDTO), wrapAsync(this.controller.createUser));
    // Update User
    // Get User
    this.router.get('/:id', verifyAuth, wrapAsync(this.controller.getUser));
    // Delete User
    // Get Current User
    // Update Current User
  };
}

export default UsersRoutes;
