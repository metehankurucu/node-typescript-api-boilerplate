import { Request, Response } from 'express';
import Mail from 'nodemailer/lib/mailer';
import { Service, Container } from 'typedi';
import config from '../../../config';
import {
  EventDispatcher,
  EventDispatcherInterface,
} from '../../../decorators/event-dispatcher.decorator';
import events from '../users/subscribers/events';
import UsersService from '../users/users.service';
import AuthService from './auth.service';
import ChangePasswordDTO from './dto/change-password.dto';
import CreateResetCodeDTO from './dto/create-reset-code.dto';
import LoginUserDTO from './dto/login-user.dto';
import VerifyResetCodeDTO from './dto/verify-reset-code.dto';

@Service()
class AuthController {
  constructor(
    private authService: AuthService,
    @EventDispatcher() private eventDispatcher: EventDispatcherInterface,
  ) {}

  login = async (req: Request, res: Response) => {
    const { user, token } = await this.authService.login(req.dto as LoginUserDTO);
    this.eventDispatcher.dispatch(events.user.logined, user);
    res.json({
      result: true,
      user,
      token,
    });
  };

  createResetCode = async (req: Request, res: Response) => {
    const { email } = req.dto as CreateResetCodeDTO;
    const code = await this.authService.createCode(email);

    const mailer: Mail = Container.get('mailer');
    mailer.sendMail({
      to: email,
      subject: 'Password Reset',
      text: `Your verification code to change your password is ${code}`,
      from: config.EMAIL_USER,
    });

    res.json({ result: true });
  };

  verifyResetCode = async (req: Request, res: Response) => {
    const { email, code } = req.dto as VerifyResetCodeDTO;
    const result = await this.authService.verifyCode(email, code);
    res.json({ result });
  };

  changePassword = async (req: Request, res: Response) => {
    const { email, code, password } = req.dto as ChangePasswordDTO;

    const userId = await this.authService.canChangePassword(email, code);

    const usersService = Container.get(UsersService);
    const result = await usersService.update(userId, { password });

    res.json({ result: !!result });
  };
}

export default AuthController;
