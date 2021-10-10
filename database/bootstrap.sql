-- create new user
CREATE USER root WITH ENCRYPTED PASSWORD 'password';
-- add permisions to user
ALTER USER root WITH SUPERUSER;
-- create database cats
CREATE DATABASE cats;
-- create database users
CREATE DATABASE users;