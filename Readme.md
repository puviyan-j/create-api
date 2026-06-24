# create-api-starter-cli

Stop wasting 30 minutes setting up Node.js backends.

🚀 Generate production-ready Express.js or NestJS APIs with TypeScript, validation, and database setup in seconds.

Create modern backend applications with TypeScript or JavaScript, built-in linting, formatting, validation, database integration, and best-practice project structure.

No setup. No configuration. No boilerplate.

Just build.

## Quick Start

### Using npx

```bash
npx create-api-starter-cli
```

### Global Installation

```bash
npm install -g create-api-starter-cli
```

Then run:

```bash
create-api-starter-cli
```

## Generate a Module

Generate a complete module with all required layers.

```bash
create-api-starter-cli generate module <name>
```

### Example

```bash
api-cli generate module user
```



## ⚡ What you get instantly

No setup. No configuration. Just build.

## 💡 Example Output

A single command gives you:

- REST API structure
- Authentication-ready foundation
- Scalable architecture
- Clean code setup
- Database integration

## Features

### Framework Support

* ⚡ Express.js
* 🏗️ NestJS

### Language Options

* TypeScript
* JavaScript

### Package Managers

Choose your preferred package manager:

* npm
* pnpm
* yarn

### Validation

Built-in validation support:

* Zod
* Joi

### Database Setup

Initialize your API with database support:

* PostgreSQL
* MySQL
* MongoDB
* SQLite

### ⚡ Production-ready by default

Everything configured for real-world applications:

- ESLint + Prettier (clean code)
- Environment variables (.env setup)
- Logging system ready
- Security middleware (CORS, Helmet)
- Folder structure (scalable architecture)

### Interactive CLI

Example flow:

```txt
? Select framework › Express.js
? Language › TypeScript
? Package manager › pnpm
? Validation library › Zod
? Database › PostgreSQL

✔ Creating project...
✔ Installing dependencies...
✔ Configuring database...
✔ Setting up ESLint & Prettier...
✔ Project ready!
```

## Why create-api-starter-cli?

Every backend project starts the same way:

* Setup project
* Configure TypeScript
* Install dependencies
* ESLint
* Prettier
* Validation libraries
* Database packages
* Create folder structure
* Environment variables

This takes 15–30 minutes every time.

This CLI automates the entire process so you can start building immediately.

## Roadmap

* Authentication templates
* Docker support
* Prisma integration
* Swagger/OpenAPI generation
* Testing setup (Jest/Vitest)
* CI/CD templates
* Microservice starter templates


## ⚔️ create-api-starter-cli vs Express Generator

Most developers start with Express Generator, but it only solves the *very basic setup problem*.

Here’s the difference:

| Feature | Express Generator | create-api-starter-cli |
|--------|------------------|--------------------------|
| Project structure | Basic MVC | MVC + Feature-based architecture |
| TypeScript support | ❌ Not built-in | ✅ Built-in |
| Validation | ❌ None | ✅ Zod / Joi |
| Logging | ❌ None | ✅ Pino / Winston |
| Security (Helmet, CORS) | ❌ Manual setup | ✅ Pre-configured |
| Environment setup | Basic | Production-ready |
| Database setup | ❌ Not included | ✅ MongoDB / SQL support |
| ORM support | ❌ None | ✅ Prisma / Drizzle / Sequelize |
| Code quality tools | ❌ Not included | ✅ ESLint + Prettier |
| CLI experience | Basic scaffolding | Interactive guided setup |
| Production readiness | ❌ Minimal | ✅ Production-ready by default |

---


> Express Generator gives you a starting point.  
> create-api-starter-cli gives you a production-ready backend.

---

Stop building boilerplate. Start building features.

## License

ISC

## Support

⭐ If this saved you time, consider starring the repo.
