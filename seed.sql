DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;
USE employee_db;

CREATE TABLE department (
id INT NOT NULL AUTO_INCREMENT,
name VARCHAR(30) NOT NULL,
PRIMARY KEY(id)
);

CREATE TABLE role (
id INT NOT NULL AUTO_INCREMENT,
title VARCHAR(30) NOT NULL,
salary DECIMAL(10,4) NULL,
departement_id INT NOT NULL,
PRIMARY KEY(id)
);

CREATE TABLE employee (
id INT NOT NULL AUTO_INCREMENT,
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30) NOT NULL,
role_id INT NOT NULL,
manager_id INT,
PRIMARY KEY(id)
);

INSERT INTO department(name)
VALUES ("Human Ressources");

INSERT INTO department(name)
VALUES ("Technical");

INSERT INTO department(name)
VALUES ("Operational");

INSERT INTO department(name)
VALUES ("Research and Development");

INSERT INTO department(name)
VALUES ("Marketing");

INSERT INTO department(name)
VALUES ("Financial");

INSERT INTO role(title, salary, departement_id)
VALUES ("CEO", 189000, 6);

INSERT INTO role(title, salary, departement_id)
VALUES ("Manager", 189000, 3);

INSERT INTO role(title, salary, departement_id)
VALUES ("CTO", 170000, 2);

INSERT INTO role(title, salary, departement_id)
VALUES ("Engineer", 163000, 4);

INSERT INTO role(title, salary, departement_id)
VALUES ("Happiness officer", 120000, 1);

INSERT INTO employee(first_name, last_name, role_id)
VALUES ("Hedi", "Calabrese", 1);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES ("Fatale", "Sniper", 4, 3);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES ("Soldier", "76", 5, 1);
