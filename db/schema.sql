drop database if exists cms_db;
create database cms_db;

use cms_db;

create table department (
    id int not null primary key,
    name varchar(30)not null
);

create table role (
    id int not null primary key,
    title varchar(30) not null,
    salary decimal not null,
    dapartment_id int,
    foreign key (dapartment_id)
    references department (id)
    on delete set null
);

create table employee (
    id int not null auto_increment primary key,
    first_name varchar(30) not null,
    last_name varchar(30) not null,
    role_id int,
    manager_id int,
    foreign key (role_id)
    references role(id)
    on delete set null,
    foreign key (manager_id)
    references employee(id)
)