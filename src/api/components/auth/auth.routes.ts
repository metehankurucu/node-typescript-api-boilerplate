import { Router } from 'express';
import Container from 'typedi';
import wrapAsync from '../../middlewares/wrap-async.middleware';
import AuthController from './auth.controller';
import { ComponentRoutes } from '../../../interfaces/index';
import { validateBody } from '../../middlewares/validate.middleware';
import LoginUserDTO from './dto/login-user.dto';
import CreateResetCodeDTO from './dto/create-reset-code.dto';
import VerifyResetCodeDTO from './dto/verify-reset-code.dto';
import ChangePasswordDTO from './dto/change-password.dto';

class AuthRoutes implements ComponentRoutes<AuthController> {
  router: Router = Router();

  readonly controller: AuthController;

  constructor() {
    this.controller = Container.get(AuthController);
    this.registerRoutes();
  }

  registerRoutes = () => {
    // Login
    this.router.post('/login', validateBody(LoginUserDTO), wrapAsync(this.controller.login));
    // Reset password - create reset code
    this.router.post(
      '/reset-password',
      validateBody(CreateResetCodeDTO),
      wrapAsync(this.controller.createResetCode),
    );
    // Reset password - verify reset code
    this.router.post(
      '/reset-password/verify',
      validateBody(VerifyResetCodeDTO),
      wrapAsync(this.controller.verifyResetCode),
    );
    // Reset password - change verified user password
    this.router.post(
      '/reset-password/change',
      validateBody(ChangePasswordDTO),
      wrapAsync(this.controller.changePassword),
    );
  };
}

export default AuthRoutes;
