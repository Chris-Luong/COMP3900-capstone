`npm install`

- to install all node modules

Go to Utils/Swagger: `node swagger.js`

- to update the swagger documentation
- update the port number in host in swagger.json:
  "host": "localhost:8800"

Setting up MySQL Workbench database:
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
flush privileges;

USE queuequicker;
-- SELECT \* from account;

select \* from menuItems;

Create/Update Tables:

- Go to init_db.sql
- app.js will scan this file init_db.sql when `npm start`
