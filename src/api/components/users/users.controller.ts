import { Request, Response } from 'express';
import { Service } from 'typedi';
import CreateUserDTO from './dto/create-user.dto';
import UpdateCurrentUserDTO from './dto/update-current-user.dto';
import UpdateUserDTO from './dto/update-user.dto';
import UsersService from './users.service';

@Service()
class UsersController {
  constructor(private usersService: UsersService) {}

  createUser = async (req: Request, res: Response) => {
    const user = await this.usersService.create(req.dto as CreateUserDTO);
    res.json({
      user,
      result: true,
    });
  };

  // TODO limit offset vs
  getUsers = async (req: Request, res: Response) => {
    const users = await this.usersService.findAll();
    res.json({
      result: true,
      users,
    });
  };

  getUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = await this.usersService.findOne({ _id: id });
    res.json({
      result: true,
      user,
    });
  };

  getCurrentUser = async (req: Request, res: Response) => {
    const { sub } = req.decoded;
    const user = await this.usersService.findOne({ _id: sub });
    res.json({
      result: true,
      user,
    });
  };

  updateUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = await this.usersService.update(id, req.dto as UpdateUserDTO);
    res.json({
      user,
      result: true,
    });
  };

  updateCurrentUser = async (req: Request, res: Response) => {
    const { sub } = req.decoded;
    const user = await this.usersService.update(sub, req.dto as UpdateCurrentUserDTO);
    res.json({
      user,
      result: true,
    });
  };

  deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await this.usersService.delete(id);
    res.json({
      result,
    });
  };
}

export default UsersController;
