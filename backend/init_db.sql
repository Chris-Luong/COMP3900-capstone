CREATE DATABASE IF NOT EXISTS queuequicker;

USE queuequicker;

CREATE TABLE IF NOT EXISTS account (
    accountId BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    firstname VARCHAR(50) NOT NULL,
    lastname VARCHAR(50) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('Customer', 'Wait Staff', 'Kitchen Staff', 'Manager')
);

INSERT IGNORE INTO account(firstname, lastname, email, password, role) VALUES("guest", "account", "guest1", "temp", 1);

INSERT IGNORE INTO account(firstname, lastname, email, password, role) VALUES("guest", "account", "guest2", "temp", 1);

INSERT IGNORE INTO account(firstname, lastname, email, password, role) VALUES("guest", "account", "guest3", "temp", 1);

INSERT IGNORE INTO account(firstname, lastname, email, password, role) VALUES("guest", "account", "guest4", "temp", 1);

INSERT IGNORE INTO account(firstname, lastname, email, password, role) VALUES("guest", "account", "guest5", "temp", 1);