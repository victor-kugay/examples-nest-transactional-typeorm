# Transactional TypeORM

[![Build Status](https://app.travis-ci.com/ViktorKugay/medium-transactional-typeorm.svg?branch=main)](https://app.travis-ci.com/ViktorKugay/medium-transactional-typeorm)
[![Maintainability](https://api.codeclimate.com/v1/badges/8c8184fda716aca2e7d6/maintainability)](https://codeclimate.com/github/ViktorKugay/medium-transactional-typeorm/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/8c8184fda716aca2e7d6/test_coverage)](https://codeclimate.com/github/ViktorKugay/medium-transactional-typeorm/test_coverage)

## Table Of Contents

- [Description](#Description)
- [Installation](#installation)
- [Start](#start)
- [Routes](#routes)

## Description

This repository provides information about usage [NestJS](https://github.com/nestjs/nest) and [TypeORM](https://github.com/typeorm/typeorm) in transactional mode. The repository consists of two main modules: [Users](https://github.com/ViktorKugay/medium-transactional-typeorm/tree/main/src/users) and [Cats](https://github.com/ViktorKugay/medium-transactional-typeorm/tree/main/src/cats). The users module stores information about users and their credits. The Cats module stores information about users' cats. Both modules use transactional mode of the TypeORM to create and read entities.

The repository provides multiple important cases of TypeORM usage. For more information read Medium article: [Transactional @nestjs/typeorm](#)

## Installation

1. Install PostgreSql

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

2. Install NPM packages

```bash
$ yarn install
```

3. Copy `.env.example` to `.env`

```bash
$ cp .env.example .env
```

4. Restart Database 

```bash
$ yarn db:reload
```

## Start

```bash
$ yarn start:dev
```

## Routes

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
$ -d '{"id": "1", "userId": "1"}'
```

```sql
SELECT 
  "User"."id" AS "User_id", 
  "User"."credits" AS "User_credits", 
  "User"."createdAt" AS "User_createdAt", 
  "User"."updatedAt" AS "User_updatedAt" 
FROM 
  "users" "User" 
WHERE 
  "User"."id" IN ($1) -- PARAMETERS: ["1"]

START TRANSACTION 
START TRANSACTION 

UPDATE 
  "users" 
SET 
  "credits" = $1, 
  "updatedAt" = CURRENT_TIMESTAMP 
WHERE 
  "id" IN ($2) -- PARAMETERS: [900,"1"]
SELECT 
  "Cat"."id" AS "Cat_id", 
  "Cat"."userId" AS "Cat_userId", 
  "Cat"."createdAt" AS "Cat_createdAt", 
  "Cat"."updatedAt" AS "Cat_updatedAt" 
FROM 
  "cats" "Cat" 
WHERE 
  "Cat"."id" IN ($1) -- PARAMETERS: ["1"]
  INSERT INTO "cats"(
    "id", "userId", "createdAt", "updatedAt"
  ) 
VALUES 
  ($1, $2, DEFAULT, DEFAULT) RETURNING "createdAt", 
  "updatedAt" -- PARAMETERS: ["1","1"]

COMMIT 
COMMIT
```

## Stay in touch

- Medium - [@viktorkugay](https://medium.com/@viktorkugay)
- Facebook - [viktor.kugay](https://www.facebook.com/viktor.kugay)
- Website - [https://vkugay.ru](https://vkugay.ru)