const db = require("../db/db");
const { addCustomertoLoyalty } = require("../db/queries/loyalty.queries");

const NOT_FOUND = 401;
const NOT_FOUND_KIND = "not_found";
const EXISTS = 409;
const EXISTS_KIND = "exists";
const CANNOT_CREATE = 400;
const CANNOT_CREATE_KIND = "cannot_create";
const CANNOT_DELETE = 400;
const CANNOT_DELETE_KIND = "cannot_delete";

class Loyalty {
  static addCustomerToLoyalty(accountId, next) {
    db.query(addCustomertoLoyalty, accountId, (err, results) => {
      if (err) {
        next(
          {
            status: EXISTS,
            message: "Error adding customer to loyalty program",
            kind: EXISTS_KIND,
          },
          null
        );
        return;
      }
      next(null, {
        message: `Successfully added customer with id ${accountId} to the loyalty program!`,
      });
    });
  }
}

module.exports = { Loyalty };
