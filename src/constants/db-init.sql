/*sudo mysql -u root -p mysql < src/constants/db-init.sql*/

create database keleya;

use keleya;

drop table if exists users;
create table users
(
    id int primary key ,
    username text not null,
    password text not null,
    createdAt datetime,
    updatedAt datetime
);

drop table if exists posts;
create table posts
(
    id int primary key ,
    author_id int,
    title text not null,
    body text not null,
    FOREIGN KEY (author_id) REFERENCES users (id),
    createdAt datetime,
    updatedAt datetime
);