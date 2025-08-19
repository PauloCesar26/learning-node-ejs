create database db_test_node;
use db_test_node;

create table infoUsers(
id int AUTO_INCREMENT,
nome varchar(100),
email varchar(100),
primary key(id)
);

SELECT * FROM infoUsers;