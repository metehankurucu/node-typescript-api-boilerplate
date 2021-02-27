import { Request, Response } from 'express';
import { Service } from 'typedi';
import {
  EventDispatcher,
  EventDispatcherInterface,
} from '../../../decorators/event-dispatcher.decorator';
import CreateUserDTO from './dto/create-user.dto';
import GetUsersDTO from './dto/get-users.dto';
import UpdateCurrentUserDTO from './dto/update-current-user.dto';
import UpdateUserDTO from './dto/update-user.dto';
import events from './subscribers/events';
import UsersService from './users.service';

@Service()
class UsersController {
  constructor(
    private usersService: UsersService,
    @EventDispatcher() private eventDispatcher: EventDispatcherInterface,
  ) {}

  createUser = async (req: Request, res: Response) => {
    const user = await this.usersService.create(req.dto as CreateUserDTO);
    this.eventDispatcher.dispatch(events.user.created, user);
    res.json({
      user,
      result: true,
    });
  };

  getUsers = async (req: Request, res: Response) => {
    const { offset, limit } = req.dto as GetUsersDTO;
    const users = await this.usersService.findAll({ offset, limit });
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
