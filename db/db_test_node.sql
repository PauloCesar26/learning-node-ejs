create database db_test_node;
use db_test_node;

create table infoUsers(
id int AUTO_INCREMENT,
nome varchar(100),
email varchar(100),
primary key(id)
);

create table adminApp(
id_admin int auto_increment,
userName varchar(50),
userPassword varchar(50),
PRIMARY KEY(id_admin)
);

INSERT INTO adminApp (userName, userPassword)
VALUES ('paulo', '123456');

SELECT * FROM infoUsers;
SELECT * FROM adminApp;