<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>
## Installation

```bash
$ npm install
```
## Database:
```bash
$ npx prisma migrate dev
```
Create a .env file in the project folder, 
it should contain: JWT_SECRET, DATABASE_URL,
define in src\prisma\schema.prisma which database you are using.

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
Backend will run on port 4000
You cna change this in src/main.ts
