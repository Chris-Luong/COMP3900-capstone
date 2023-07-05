const db = require("../db/db");
const { getAllMenuItems, filterCategory, searchMenuItemsAND, searchMenuItems, filterPrice, filterPriceAND, sortMenuItems } = require("../db/queries/menu.queries");

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

  static getFilteredMenuItems(search=null, category=null, min_price, max_price, sort_type, sort_order, cb) {
    let final_query = getAllMenuItems;
    let params = [];
    if (category) {
      final_query += filterCategory;
      params.push(category);
    }
    if (search) {
      search = '%' + search + '%';
      if (category) {
        final_query += searchMenuItemsAND;
      } else {
        final_query += searchMenuItems;
      }
      params.push(search);
    }
    if (category || search) {
      final_query += filterPriceAND;
    } else {
      final_query += filterPrice;
    }
    params.push(max_price, min_price);
    final_query += sortMenuItems + " menuitems." + sort_type + ' ' + sort_order;
    console.log(final_query);
    console.log(params);

    return db.query(final_query, params, (err, result) => {
      console.log("MySQL Error: " + err);
      console.log("MySQL Result:", result);
      if (err) {
        return cb({
          status: 500,
          message: "Backend internal Error.",
          kind: "Internal server error."
        }, null);
      }
      let res = JSON.parse(JSON.stringify(result));
      return cb(null, res);
    })

  }
}

module.exports = { Menu, NOT_FOUND, EXISTS };
