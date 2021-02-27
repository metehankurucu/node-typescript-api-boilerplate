/* eslint-disable class-methods-use-this */
import { Container } from 'typedi';
import { EventSubscriber, On } from 'event-dispatch';
import { Logger } from 'winston';
import events from './events';
import { User } from '../interfaces/user.interface';

@EventSubscriber()
class UserSubscriber {
  @On(events.user.logined)
  public onUserLogin({ _id }: Partial<User>) {
    const logger: Logger = Container.get('logger');
    logger.info(`New login event user with id ${_id}`);
  }

  @On(events.user.created)
  public onUserCreate({ email }: Partial<User>) {
    const logger: Logger = Container.get('logger');
    logger.info(`New user create event user with email ${email}`);
  }
}

export default UserSubscriber;
