/*sudo mysql -u root -p mysql < src/constants/db-init.sql*/
drop database if exists keleya;
create database keleya;

use keleya;

select "Generating users table...";
create table users
(
    id int primary key auto_increment,
    username text not null,
    password text not null,
    createdAt datetime,
    updatedAt datetime
);

select "Generating posts table...";
create table posts
(
    id int primary key auto_increment,
    author_id int,
    title text not null,
    body text not null,
    FOREIGN KEY(author_id) REFERENCES users(id),
    createdAt datetime,
    updatedAt datetime
);
