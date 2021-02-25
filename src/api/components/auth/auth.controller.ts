import { Request, Response } from 'express';
import { Service } from 'typedi';
import AuthService from './auth.service';
import { LoginUserDTO } from './interfaces/auth.interface';

@Service()
class AuthController {
  constructor(private authService: AuthService) {}

  login = async (req: Request, res: Response) => {
    const { user, token } = await this.authService.login(req.dto as LoginUserDTO);
    res.json({
      result: true,
      user,
      token,
    });
  };
}

export default AuthController;
