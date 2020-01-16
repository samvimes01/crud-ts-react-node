# Sample CRUD application

## Stack

- Frontend: Typescript, React
- Backend: Typescript, NodeJs/Express, Sequelize, Mysql
- Container: Docker, docker-compose

## First run

### copy `.env.sample` to `.env`

### In the app folder run `npm run start` - this will run a `docker-compose up -d` command

### To create database tables you should get into server container

- `docker-compose exec server sh`
- `npm run migrate`
- In dev environment you can seed tables with `npm run seed`

- Now you can access application at [http://localhost:3000](http://localhost:3000) (api is running at [http://localhost:5000](http://localhost:5000))

### In the root folder you can find a Postman json collection to import and test. First Sign In (and retrieve jwt token, than use other endpoints)
