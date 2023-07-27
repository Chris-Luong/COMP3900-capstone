const { Loyalty } = require("../models/loyalty.model");

/**
 * adds customer with accountId to loyalty program
 * @param {int}           accountId
 *
 * @returns {string}
 */
joinLoyalty = (req, res) => {
  const accountId = req.body.accountId;
  Loyalty.addCustomerToLoyalty(accountId, (err, result) => {
    if (err) {
      return res.status(err.status).json({ message: err.message });
    }
    if (!result) {
      return res.status(NOT_FOUND).json({ message: "Cannot Join Loyalty" });
    }
    return res.status(200).json(result);
  });
};

module.exports = {
  joinLoyalty,
};
