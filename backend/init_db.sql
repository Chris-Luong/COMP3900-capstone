-- Define a table for accounts
 
CREATE TABLE IF NOT EXISTS account (
    accountId INT PRIMARY KEY AUTO_INCREMENT,
    firstname VARCHAR(50) NULL,
    lastname VARCHAR(50) NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('kitchen stuff', 'manager', 'customer', 'wait stuff')
)
