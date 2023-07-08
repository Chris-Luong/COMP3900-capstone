const db = require("../db/db");
const { getAllMenuItems,
        getCategories, 
        getCategoryNamesFromItemId,
        filterCategory, 
        searchMenuItemsAND, 
        searchMenuItems, 
        filterPrice, 
        filterPriceAND, 
        sortMenuItems, 
        insertMenuItem, 
        insertMenuItemCategories, 
        deleteMenuItem, 
        deleteMenuItemCategories, 
        getCategory,
        updateMenuItem } = require("../db/queries/menu.queries");

// TODO: create constants to share between all *.model.js files
const NOT_FOUND = 401;
const EXISTS = 409;

class Menu {

  /**
   * The callback to return the error or result of this function
   * @callback callback
   * @param {object}        error            The error if encountered, null otherwise
   * @param {object}        result           The result if successful, null otherwise
   */
  /**
   * Add an item to the menu with along with given parameters.
   * @param {string}        name             The name of the menu item
   * @param {string}        description      The description of the menu item
   * @param {string}        ingredients      The ingredients of the menu item
   * @param {string}        categories       The menu item's categories
   * @param {int}           price            The price of the menu item
   * @param {string}        thumb            The path of the image
   * @param {callback}      cb               Callback function
   * 
   * @returns {null}
   */
  static addMenuItem(name, description, ingredients, categories, price, thumb, cb) {
    const menuValues = [name, description, ingredients, price, thumb];
    let itemId;
    db.query(insertMenuItem, menuValues, (err, result) => {
      if (err) {
        cb({
          status: 500,
          message: "Failed to add item to menu",
          kind: "Internal Server Error."
        }, null);
        return;
      }
      itemId = result.insertId;
    });

    categories.forEach((category) => {
      db.query(getCategory, category, (err, result) => {
        if (err) {
          cb({
            status: 500,
            message: "Failed to get category id",
            kind: "Internal Server Error."
          }, null);
          return;
        }
        const categoryValues = [itemId, result[0].id];
        db.query(insertMenuItemCategories, categoryValues, (err) => {
          if (err) {
            cb({
              status: 500,
              message: "Failed to add category to menu item",
              kind: "Internal Server Error."
            }, null);
            return;
          }
        });
      });
    });
    cb(null, {message: "Successfully added item to the menu!"});
    return;
  }

  static editMenuItem(id, name, description, ingredients, categories, price, thumb, cb) {
    const menuItemValues = [name.replace(/["']/g, ''), description.replace(/["']/g, ''), 
                            ingredients.replace(/["']/g, ''), price, thumb, id];
    let new_categories = [];
    if (!Array.isArray(categories)) {
      new_categories.push(categories);
    } else {
      new_categories = categories
    }
    db.query(updateMenuItem, menuItemValues, (err) => {
      if (err) {
        cb({
          status: 500,
          message: "Failed to update menu item",
          kind: "Internal Server Error."
        }, null);
        return;
      }
    });
    db.query(deleteMenuItemCategories, id, (err) => {
      if (err) {
        cb({
          status: 500,
          message: "Failed to delete categories from item",
          kind: "Internal Server Error."
        }, null);
        return;
      }
    });
    new_categories.forEach((category) => {
      category = category.replace(/["']/g, '');
      db.query(getCategory, category, (err, result) => {
        if (err) {
          cb({
            status: 500,
            message: "Failed to get category id",
            kind: "Internal Server Error."
          }, null);
          return;
        }
        const categoryValues = [id, result[0].id];
        db.query(insertMenuItemCategories, categoryValues, (err) => {
          if (err) {
            cb({
              status: 500,
              message: "Failed to add category to menu item",
              kind: "Internal Server Error."
            }, null);
            return;
          }
        });
      });
    });
    cb(null, {message: "Successfully updated item to the menu!"});
    return;
  }

  /**
   * The callback to return the error or result of this function
   * @callback callback
   * @param {object}        error            The error if encountered, null otherwise
   * @param {object}        result           The result if successful, null otherwise
   */
  /**
   * Remove an item to the menu using the db menuItem id.
   * @param {int}           id               The id of the db entry of the menu item 
   * @param {callback}      cb               Callback function
   * 
   * @returns {null}
   */
  static removeMenuItem(id, cb) {
    db.query(deleteMenuItemCategories, [id], (err) => {
      if (err) {
        cb({
          status: 500,
          message: "Failed to delete category from menu item",
          kind: "Internal Server Error"
        }, null);
        return;
      }
    });
    db.query(deleteMenuItem, [id], (err, result) => {
      if (err) {
        cb({
          status: 500,
          message: "Failed to delete item from menu",
          kind: "Internal Server Error"
        }, null);
        return;
      }
    });
    cb(null, {message: "Successfully deleted item from menu"});
    return;
  }


  /**
   * The callback to return the error or result of this function
   * @callback callback
   * @param {object}        error            The error if encountered, null otherwise
   * @param {object}        result           The result if successful, null otherwise
   */
  /**
   * This function is used to get menu items with specific filters, sort, and search.
   * @param {string}        search           String that is used to search menu items
   * @param {string}        category         String that is used to filter menu items by category
   * @param {int}           min_price        Minimum price of the menu items
   * @param {int}           min_price        Maximum price of the menu items
   * @param {string}        sort_type        The type to sort menu items by
   * @param {string}        sort_order       The order to sort menu items by
   * @param {callback}      cb               Callback function
   * 
   * @returns {null}
   */
  static getFilteredMenuItems(search=null, category=null, min_price=0, max_price=100, sort_type="name", sort_order="ASC", cb) {
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
        cb({
          status: 500,
          message: "Failed to retrieve menu items",
          kind: "Internal server error."
        }, null);
        return;
      }
      let res = JSON.parse(JSON.stringify(result));
      cb(null, res);
    })
    return;
  }

  static getCategories(next) {
    return db.query(getCategories, [], (err, results) => {
      if (err) {
        return next(
          {
            status: 500,
            message: "Error retrieving categories",
            kind: "Internal server error."
          },
          null
        );
      }

      let result = JSON.parse(JSON.stringify(results));
      return next(null, result);
    });
  }

  static getCategoryNames(itemId, cb) {
    db.query(getCategoryNamesFromItemId, [itemId], (err, result) => {
      if (err) {
        cb(
          {
            status: 500,
            message: "Failed to get categories",
            kind: "Internal Server Error",
          },
          null
        );
        return;
      }
      const names = [];
      result.forEach(packet => names.push(packet.name));
      let res = JSON.parse(JSON.stringify(names));
      cb(null, res);
    });
  }
}

module.exports = { Menu, NOT_FOUND, EXISTS };
