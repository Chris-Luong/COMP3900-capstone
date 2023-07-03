const db = require("../db/db");
const { getAllMenuItems } = require("../db/queries/menu.queries");

// TODO: create constants for universal error codes and messages
const NOT_FOUND = 401;
const NOT_FOUND_KIND = "not_found";
const EXISTS = 409;
const EXISTS_KIND = "exists";

class Menu {
  constructor(name, description, price, availability) {
    this.name = name;
    this.description = description;
    this.price = price;
    this.availability = availability;
  }

  static getAllMenuItems(next) {
    return db.query(getAllMenuItems, [], (err, results) => {
      console.log("MySQL Error: " + err);
      console.log("MySQL Result:", results);

      if (err) {
        return next(
          {
            status: EXISTS,
            message: "Error retrieving menu items",
            kind: EXISTS_KIND,
          },
          null
        );
      }

      let result = JSON.parse(JSON.stringify(results));
      return next(null, result);
    });
  }
}

module.exports = { Menu, NOT_FOUND, EXISTS };
