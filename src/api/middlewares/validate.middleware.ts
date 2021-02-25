import createError from 'http-errors';
import { NextFunction, Request, Response } from 'express';
import { validate as validator } from 'class-validator';
import deleteUndefinedProps from '../../utils/delete-undefined-props.util';

type RequestPart = 'body' | 'query' | 'params';

export const validate = (ValidatorClass, requestPart: RequestPart) => async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const validation = new ValidatorClass(req[requestPart]);

  const errors = await validator(validation);

  if (errors.length > 0) {
    const validationErrors = errors.reduce(
      (acc, error) => `${acc}${acc ? ', ' : ''}${Object.values(error.constraints).join(', ')}`,
      '',
    );
    next(createError(400, validationErrors));
  }

  req.dto = req.dto
    ? { ...req.dto, ...deleteUndefinedProps(validation) }
    : { ...deleteUndefinedProps(validation) };

  next();
};

export const validateBody = (ValidatorClass) => validate(ValidatorClass, 'body');
export const validateQuery = (ValidatorClass) => validate(ValidatorClass, 'query');
export const validateParams = (ValidatorClass) => validate(ValidatorClass, 'params');
