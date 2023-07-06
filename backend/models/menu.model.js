const db = require("../db/db");
const { getAllMenuItems, getCategories, filterCategory, searchMenuItemsAND, searchMenuItems, filterPrice, filterPriceAND, sortMenuItems } = require("../db/queries/menu.queries");

// TODO: create constants for universal error codes and messages
const NOT_FOUND = 401;
const NOT_FOUND_KIND = "not_found";
const EXISTS = 409;
const EXISTS_KIND = "exists";

class Menu {

  /**
   * The callback to return the error or result of this function
   * @callback cb
   * @param {object}        error            The error if encountered, null otherwise
   * @param {object}        result            The result if successful, null otherwise
   */
  /**
   * This function is used to get menu items with specific filters, sort, and search.
   * @param {string}        search           String that is used to search menu items
   * @param {string}        category         String that is used to filter menu items by category
   * @param {int}           min_price        Minimum price of the menu items
   * @param {int}           min_price        Maximum price of the menu items
   * @param {string}        sort_type        The type to sort menu items by
   * @param {string}        sort_order       The order to sort menu items by
   * @param {callback}      cb
   * 
   * @returns {null}
   */
  static getFilteredMenuItems(search=null, category=null, min_price=0, max_price=100, sort_type="alpha", sort_order="ASC", cb) {
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

    db.query(final_query, params, (err, result) => {
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

  static getCategories(next) {
    return db.query(getCategories, [], (err, results) => {
      if (err) {
        return next(
          {
            status: EXISTS,
            message: "Error retrieving categories",
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
