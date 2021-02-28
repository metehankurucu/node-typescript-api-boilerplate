<div align="center">
  <h1>
    <br />
    Node TypeScript API Boilerplate
    <br />
    <br />
    <br />
  </h1>
  <sup>
  <img src="https://img.shields.io/circleci/build/github/metehankurucu/node-typescript-api-boilerplate" alt="build" />
  <img src="https://badgen.net/badge/-/TypeScript/blue?icon=typescript&label" alt="typescript">
  <img src="https://img.shields.io/github/license/metehankurucu/node-typescript-api-boilerplate" alt="license" />
  </sup>
</div>

## Table of Contents

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/4dd5273ee50a4e7a9d763ee40061bd2f)](https://app.codacy.com/gh/metehankurucu/node-typescript-api-boilerplate?utm_source=github.com&utm_medium=referral&utm_content=metehankurucu/node-typescript-api-boilerplate&utm_campaign=Badge_Grade_Settings)

- [About](#About)
- [Features](#Features)
- [API Endpoints](#API-Endpoints)
- [Structure](#Structure)
- [Prerequsities](#Prerequsities)
- [Installation](#Installation)
- [Inspirations](#Inspirations)
- [License](#License)

## About

A boilerplate/starter project to build REST APIs using Node.js with Typescript.

Some boilerplates are too customized, here I tried to build a less complex but good structure with essentials. The sources I have used and I have taken some code samples are [here](#inspirations).

## Features

- **Structure by Components** [see](src/api/)
- **Dependency Injection** using [typedi](https://github.com/typestack/typedi)
- **Validation Layer** with [class-validator](https://github.com/typestack/class-validator), using [dto](src/api/components/users/dto) and [custom middleware](src/api/middlewares/validate.middleware.ts)
- **MongoDB** object data modeling with [mongoose](https://mongoosejs.com/)
- **Rate Limiting** with [express-rate-limit](https://github.com/nfriedly/express-rate-limit)
- **Monitoring** with [express-status-monitor](https://github.com/RafalWilinski/express-status-monitor)
- **Events - Subscribers** using [event-dispatch](https://www.npmjs.com/package/event-dispatch)
- **Continuous Integration** using [circleci](https://circleci.com/)
- **Role based authorization**
- **Error Handling** centralized
- **Linting** using [eslint](https://eslint.org/) and [prettier](https://prettier.io/)
- **Logging** with [winston](https://github.com/winstonjs/winston)

## API Endpoints

All available routes:

**User routes**:\
`POST /users` - create a user\
`GET /users` - get all users with pagination _[admin roles]_\
`GET /users/:userId` - get user _[admin roles]_\
`PUT /users/:userId` - update user _[admin roles]_\
`DELETE /users/:userId` - delete user _[admin roles]_\
`GET /users/me` - get current user\
`PUT /users/me` - update current user

**Auth routes**:\
`POST /auth/login` - login with email and password\
`POST /auth/reset-password` - create reset code and send with email\
`POST /auth/reset-password/verify` - verify reset code\
`POST /auth/reset-password/change` - change password after verify reset code

## Structure

Folder structure

```
src
├── api
│   ├── components
│   │   ├── auth
│   │   └── users
│   │       ├── dto                   # Data Transfer Objects
│   │       ├── interfaces            # Component level interfaces
│   │       ├── models                # Mongoose models
│   │       ├── subscribers           # Event subscribers
│   │       ├── users.service.ts      # Business logic
│   │       ├── users.controller.ts   # Route controllers
│   │       └── users.routes.ts       # Routes
│   │
│   ├── middlewares     # Custom express middlewares
│   └── routes.ts       # All component routes
│
├── config        # Environment variables and configuration
├── constants     # Constants such as roles, enums vs.
├── decorators    # Custom decorators
├── interfaces    # General interfaces
├── jobs          # Cron jobs
├── loaders       # All loaders to start server
├── types         # Custom type definitions
├── uploads       # Updloaded files
├── utils         # Utility functions
└── main.ts       # Entry Point

```

All structure

```
src
├── api
│   ├── components
│   │   ├── auth
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.routes.ts
│   │   │   ├── auth.service.ts
│   │   │   ├── dto
│   │   │   │   ├── change-password.dto.ts
│   │   │   │   ├── create-reset-code.dto.ts
│   │   │   │   ├── login-user.dto.ts
│   │   │   │   └── verify-reset-code.dto.ts
│   │   │   ├── interfaces
│   │   │   │   └── auth.interface.ts
│   │   │   └── models
│   │   │       └── password-reset.model.ts
│   │   └── users
│   │       ├── dto
│   │       │   ├── create-user.dto.ts
│   │       │   ├── get-users.dto.ts
│   │       │   ├── update-current-user.dto.ts
│   │       │   └── update-user.dto.ts
│   │       ├── interfaces
│   │       │   └── user.interface.ts
│   │       ├── models
│   │       │   └── user.model.ts
│   │       ├── subscribers
│   │       │   ├── events.ts
│   │       │   └── user.subscriber.ts
│   │       ├── users.controller.ts
│   │       ├── users.routes.ts
│   │       └── users.service.ts
│   ├── middlewares
│   │   ├── validate.middleware.ts
│   │   ├── verify-access.middleware.ts
│   │   ├── verify-auth.middleware.ts
│   │   └── wrap-async.middleware.ts
│   └── routes.ts
├── config
│   └── index.ts
├── constants
│   ├── auth.ts
│   ├── enums.ts
│   └── index.ts
├── decorators
│   └── event-dispatcher.decorator.ts
├── interfaces
│   └── index.ts
├── jobs
├── loaders
│   ├── dependency-injector.ts
│   ├── events.ts
│   ├── express.ts
│   ├── index.ts
│   ├── jobs.ts
│   ├── logger.ts
│   ├── mailer.ts
│   ├── mongoose.ts
│   ├── monitor.ts
│   └── post-startup.ts
├── main.ts
├── types
│   └── express
│       └── index.d.ts
├── uploads
└── utils
    ├── delete-undefined-props.util.ts
    └── generate-date-range-from-now.util.ts
```

## Prerequsities

- Node.js
- MongoDB database
- SMTP server for mail

## Installation

Copy .env.example to .env and enter your information

```
cp .env.example .env
```

Then install modules and start server

```
npm install
npm run dev
```

## Inspirations

Resources for inspiration and some code samples

- https://github.com/goldbergyoni/nodebestpractices
- https://github.com/santiq/bulletproof-nodejs
- https://github.com/aionic-org/aionic-core
- https://github.com/w3tecch/express-typescript-boilerplate
- https://github.com/hagopj13/node-express-boilerplate
- [NestJS](https://nestjs.com/)

## License

[MIT](LICENSE)
