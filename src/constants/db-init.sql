/*sudo mysql -u root -p mysql < src/constants/db-init.sql*/

create database keleya;

use keleya;

drop table if exists users;
create table users(
    id int auto_increment primary key,
    username text not null,
    password text not null,
    createdAt datetime,
    updatedAt datetime
);

drop table if exists posts;
create table posts(
    id int auto_increment primary key,
    title text not null,
    body text not null,
    CONSTRAINT author_id FOREIGN KEY (id) REFERENCES users(id),
    createdAt datetime,
    updatedAt datetime
);