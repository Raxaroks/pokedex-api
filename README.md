<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# How to run this project for development
1) Clone the repository
2) Execute the next command:
```
npm install
```
3) Install NestJS CLI if is not installed:
```
npm i -g @nestjs/cli
```
4) Run the local database using ```docker-compose```:
```
docker-compose up -d
```
5) Run the project in dev mode with the ```watch``` flag activated:
```
npm run start:dev
```

6) Run the SEED route in order to populate the DB:
```
localhost:3000/api/v2/seed
```

# How to run a environment build
1) Create the required environment file, for instance: ```.env.prod```
2) Populate environment variables
3) Build the new image:
```
docker-compose -f docker-compose.prod.yaml --env-file .env.prod up --build
```
4) EXTRA! Run in dettached mode:
```
docker-compose -f docker-compose.prod.yaml --env-file .env.prod up -d
```