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

-- guest accounts have password 'temp123'
INSERT IGNORE INTO account(firstname, lastname, email, password, role) VALUES("guest", "account", "guest1", "$2b$10$4oKl80KpkMLh8kl4uA1ToOU/cX6lzjc3W8UXXCC5KUmnfkk8E6dNW", 1);

INSERT IGNORE INTO account(firstname, lastname, email, password, role) VALUES("guest", "account", "guest2", "$2b$10$4oKl80KpkMLh8kl4uA1ToOU/cX6lzjc3W8UXXCC5KUmnfkk8E6dNW", 1);

INSERT IGNORE INTO account(firstname, lastname, email, password, role) VALUES("guest", "account", "guest3", "$2b$10$4oKl80KpkMLh8kl4uA1ToOU/cX6lzjc3W8UXXCC5KUmnfkk8E6dNW", 1);

INSERT IGNORE INTO account(firstname, lastname, email, password, role) VALUES("guest", "account", "guest4", "$2b$10$4oKl80KpkMLh8kl4uA1ToOU/cX6lzjc3W8UXXCC5KUmnfkk8E6dNW", 1);

INSERT IGNORE INTO account(firstname, lastname, email, password, role) VALUES("guest", "account", "guest5", "$2b$10$4oKl80KpkMLh8kl4uA1ToOU/cX6lzjc3W8UXXCC5KUmnfkk8E6dNW", 1);

-- staff have password '123123'
INSERT IGNORE INTO account (firstname, lastname, email, password, role) values ('Manager1', 'Manager1', 'manager1@email.com', '$2b$10$CmDwstzoBlPWoSvBsr0.FObXtmYEA4gJCvRXKh7BGKTdV6effPUPK', 'Manager');

INSERT IGNORE INTO account (firstname, lastname, email, password, role) values ('WaitStaff1', 'WaitStaff1', 'waitstaff1@email.com', '$2b$10$CmDwstzoBlPWoSvBsr0.FObXtmYEA4gJCvRXKh7BGKTdV6effPUPK', 'Wait Staff');

INSERT IGNORE INTO account (firstname, lastname, email, password, role) values ('KitchenStaff1', 'KitchenStaff1', 'kitchenstaff1@email.com', '$2b$10$CmDwstzoBlPWoSvBsr0.FObXtmYEA4gJCvRXKh7BGKTdV6effPUPK', 'Kitchen Staff');