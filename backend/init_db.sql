DROP DATABASE IF EXISTS queuequicker;
CREATE DATABASE queuequicker;

USE queuequicker;

CREATE TABLE IF NOT EXISTS account (
    accountId BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    firstname VARCHAR(50) NOT NULL,
    lastname VARCHAR(50) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('Customer', 'Wait Staff', 'Kitchen Staff', 'Manager')
);

CREATE TABLE IF NOT EXISTS menuItems (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    description TEXT,
    ingredients VARCHAR(255),
    price DECIMAL(6, 2) NOT NULL,
    availability TINYINT(1) NOT NULL DEFAULT 1,
    thumbnail BLOB,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS categories (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS menuItemsCategories (
    itemId INT UNSIGNED,
    categoryId INT UNSIGNED,
    PRIMARY KEY (itemId, categoryId),
    FOREIGN KEY (itemId) REFERENCES menuItems(id),
    FOREIGN KEY (categoryId) REFERENCES categories(id)
);

CREATE TABLE IF NOT EXISTS orders (
    accountId BIGINT UNSIGNED NOT NULL,
    tableId INT UNSIGNED NOT NULL,
    itemId INT UNSIGNED NOT NULL,
    quantity INT UNSIGNED NOT NULL,
    note VARCHAR(255),
    orderTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (accountId, itemId, orderTime),
    FOREIGN KEY (accountId) REFERENCES account(accountId),
    FOREIGN KEY (itemId) REFERENCES menuItems(id)
);

-- guest accounts have password 'temp123'
INSERT IGNORE INTO account(firstname, lastname, email, password, role) VALUES("guest", "account", "guest1", "$2b$10$4oKl80KpkMLh8kl4uA1ToOU/cX6lzjc3W8UXXCC5KUmnfkk8E6dNW", 1);

INSERT IGNORE INTO account(firstname, lastname, email, password, role) VALUES("guest", "account", "guest2", "$2b$10$4oKl80KpkMLh8kl4uA1ToOU/cX6lzjc3W8UXXCC5KUmnfkk8E6dNW", 1);

INSERT IGNORE INTO account(firstname, lastname, email, password, role) VALUES("guest", "account", "guest3", "$2b$10$4oKl80KpkMLh8kl4uA1ToOU/cX6lzjc3W8UXXCC5KUmnfkk8E6dNW", 1);

INSERT IGNORE INTO account(firstname, lastname, email, password, role) VALUES("guest", "account", "guest4", "$2b$10$4oKl80KpkMLh8kl4uA1ToOU/cX6lzjc3W8UXXCC5KUmnfkk8E6dNW", 1);

INSERT IGNORE INTO account(firstname, lastname, email, password, role) VALUES("guest", "account", "guest5", "$2b$10$4oKl80KpkMLh8kl4uA1ToOU/cX6lzjc3W8UXXCC5KUmnfkk8E6dNW", 1);

-- test customer account
INSERT IGNORE INTO account(firstname, lastname, email, password, role) VALUES("test", "account", "test@email.com", "$2b$10$CmDwstzoBlPWoSvBsr0.FObXtmYEA4gJCvRXKh7BGKTdV6effPUPK", 1);

-- staff have password '123123'
INSERT IGNORE INTO account (firstname, lastname, email, password, role) values ('Manager1', 'Manager1', 'manager1@email.com', '$2b$10$CmDwstzoBlPWoSvBsr0.FObXtmYEA4gJCvRXKh7BGKTdV6effPUPK', 'Manager');

INSERT IGNORE INTO account (firstname, lastname, email, password, role) values ('WaitStaff1', 'WaitStaff1', 'waitstaff1@email.com', '$2b$10$CmDwstzoBlPWoSvBsr0.FObXtmYEA4gJCvRXKh7BGKTdV6effPUPK', 'Wait Staff');

INSERT IGNORE INTO account (firstname, lastname, email, password, role) values ('KitchenStaff1', 'KitchenStaff1', 'kitchenstaff1@email.com', '$2b$10$CmDwstzoBlPWoSvBsr0.FObXtmYEA4gJCvRXKh7BGKTdV6effPUPK', 'Kitchen Staff');

INSERT INTO categories (name) VALUES
    ('Breakfast'),
    ('Lunch'),
    ('Dinner'),
    ('Pizza'),
    ('Burger')
;

INSERT INTO menuItems (name, description, ingredients, price) VALUES
    ('Pancakes', 'Delicious fluffy pancakes served with syrup and butter.', 'Eggs, Flour, Milk', 7.99),
    ('Sausage and Egg', 'Scrambled eggs with savory sausage links.', 'Eggs, Butter, Pork Sausages', 6.99),
    ('Waffles', 'Golden-brown waffles topped with fresh fruits and whipped cream.', 'Eggs, Flour, Milk', 8.99),
    ('Pepperoni Pizza', 'Classic pizza topped with pepperoni slices.', 'Flour, Pepperoni, Cheese', 12.99),
    ('Supreme Pizza', 'Loaded with a variety of toppings including pepperoni, sausage, onions, bell peppers, and mushrooms.', 'Flour, Cheese, and much more', 14.99),
    ('Cheeseburger', 'Juicy beef patty with melted cheese, lettuce, tomato, and onions.', 'Toasted Bun, Cheese, Beef Patty, Tomato Sauce', 9.99),
    ('Junior Cheeseburger', 'Smaller-sized cheeseburger perfect for a quick bite.', 'Toasted Bun, Cheese, Beef Patty, Tomato Sauce', 6.99),
    ('Fish and Chips', 'Crispy battered fish served with seasoned fries.', 'Fish, Chips', 10.99),
    ('Soup of the Night', 'Warm, hearty soup!', 'Ask the waiter!', 9.99),
    ('Test item', 'Test description', 'Test ingredients', 5.99);

INSERT INTO menuItemsCategories (itemId, categoryId) VALUES
    (1, 1), -- Pancakes - Breakfast
    (2, 1), -- Sausage and Egg - Breakfast
    (3, 1), -- Waffles - Breakfast
    (4, 4), -- Pepperoni Pizza - Pizzas
    (4, 2),
    (4, 3),
    (5, 4), -- Supreme Pizza - Pizzas
    (5, 2),
    (5, 3),
    (6, 5), -- Cheeseburger - Burgers
    (6, 2),
    (7, 5), -- Junior Cheeseburger - Burgers
    (7, 2),
    (8, 2), -- Fish and Chips - Lunch
    (9, 3), -- Dish for Dinner - Dinner
    (10, 3) -- test item - dinner
;

INSERT INTO orders (accountId, tableId, itemId, quantity, note) VALUES 
    (1, 1, 1, 1, "burnt please"), 
    (2, 2, 2, 2, "cut up the sausage")
;