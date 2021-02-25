import { Router } from 'express';

export interface ComponentRoutes<T> {
  readonly controller: T;
  readonly router: Router;

  registerRoutes(): void;
}
