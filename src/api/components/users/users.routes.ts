import { Router } from 'express';
import Container from 'typedi';
import { validateBody, validateQuery } from '../../middlewares/validate.middleware';
import { ComponentRoutes } from '../../../interfaces';
import UsersController from './users.controller';
import wrapAsync from '../../middlewares/wrap-async.middleware';
import verifyAuth from '../../middlewares/verify-auth.middleware';
import verifyAccess from '../../middlewares/verify-access.middleware';
import { AdminRoles } from '../../../constants';
import CreateUserDTO from './dto/create-user.dto';
import UpdateUserDTO from './dto/update-user.dto';
import UpdateCurrentUserDTO from './dto/update-current-user.dto';
import GetUsersDTO from './dto/get-users.dto';

class UsersRoutes implements ComponentRoutes<UsersController> {
  router: Router = Router();

  readonly controller: UsersController;

  constructor() {
    this.controller = Container.get(UsersController);
    this.registerRoutes();
  }

  registerRoutes = () => {
    // Get All Users
    this.router.get(
      '/',
      verifyAuth,
      verifyAccess(AdminRoles),
      validateQuery(GetUsersDTO),
      wrapAsync(this.controller.getUsers),
    );
    // Create User
    this.router.post('/', validateBody(CreateUserDTO), wrapAsync(this.controller.createUser));
    // Get Current User
    this.router.get('/me', verifyAuth, wrapAsync(this.controller.getCurrentUser));
    // Update Current User
    this.router.put(
      '/me',
      verifyAuth,
      validateBody(UpdateCurrentUserDTO),
      wrapAsync(this.controller.updateCurrentUser),
    );
    // Update User
    this.router.put(
      '/:id',
      verifyAuth,
      verifyAccess(AdminRoles),
      validateBody(UpdateUserDTO),
      wrapAsync(this.controller.updateUser),
    );
    // Get User
    this.router.get(
      '/:id',
      verifyAuth,
      verifyAccess(AdminRoles),
      wrapAsync(this.controller.getUser),
    );
    // Delete User
    this.router.delete(
      '/:id',
      verifyAuth,
      verifyAccess(AdminRoles),
      wrapAsync(this.controller.deleteUser),
    );
  };
}

export default UsersRoutes;
