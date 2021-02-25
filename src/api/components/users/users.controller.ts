import { Request, Response } from 'express';
import { Service } from 'typedi';
import UsersService from './users.service';
import { CreateUserDTO } from './interfaces/user.interface';

@Service()
class UsersController {
  constructor(private usersService: UsersService) {}

  getUser = async (req: Request, res: Response) => {
    const { _id } = req.params;
    const user = await this.usersService.findOne({ _id });
    res.json({
      result: true,
      user,
    });
  };

  getUsers = async (req: Request, res: Response) => {
    const users = await this.usersService.findAll();
    res.json({
      result: true,
      users,
    });
  };

  createUser = async (req: Request, res: Response) => {
    const user = await this.usersService.create(req.dto as CreateUserDTO);
    res.json({
      user,
      result: true,
    });
  };
}

export default UsersController;
