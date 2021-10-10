# Transactional TypeORM

## Installation

```bash
# Ubuntu
$ sudo apt-get install postgresql-client
# macOS
$ brew install postgresql
# start container with postgres
$ docker-compose up -d
# connect to the container
$ psql -d postgres
# create new user
CREATE USER root WITH ENCRYPTED PASSWORD 'password';
# add permisions to user
ALTER USER root WITH SUPERUSER;
# create database cats
CREATE DATABASE cats;
# create database users
CREATE DATABASE users;
```

## Start

```bash
# copy envs
$ cp .env.example .env
# install deps
$ yarn
# migrate databases
$ yarn db:migrate
# start service
$ yarn start:dev
```

## Examples

### Curl

#### Create user if not exists

```bash
$ curl localhost:3000/api/v1/users \
$ -H 'Content-Type: application/json' \
$ -d '{"id": "1", "credits": 1000}'
```

```sql
START TRANSACTION 
SELECT 
  "User"."id" AS "User_id", 
  "User"."credits" AS "User_credits", 
  "User"."createdAt" AS "User_createdAt", 
  "User"."updatedAt" AS "User_updatedAt" 
FROM 
  "users" "User"
WHERE 
  "User"."id" IN ($1) -- PARAMETERS: ["1"]

SELECT 
  "User"."id" AS "User_id", 
  "User"."credits" AS "User_credits", 
  "User"."createdAt" AS "User_createdAt", 
  "User"."updatedAt" AS "User_updatedAt" 
FROM 
  "users" "User" 
WHERE 
  "User"."id" IN ($1) -- PARAMETERS: ["1"]

INSERT INTO "users"(
    "id", "credits", "createdAt", "updatedAt"
  ) 
VALUES 
  ($1, $2, DEFAULT, DEFAULT) RETURNING "createdAt", 
  "updatedAt" -- PARAMETERS: ["1",1000]

COMMIT
```

#### Create cat and update user credits

```bash
$ curl localhost:3000/api/v1/cats \
$ -H 'Content-Type: application/json' \
$ -d '{"userId": "1"}'
```