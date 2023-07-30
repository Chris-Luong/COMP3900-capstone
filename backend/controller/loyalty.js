const { Loyalty } = require("../models/loyalty.model");
const { Order } = require("../models/order.model");

/**
 * adds customer with accountId to loyalty program
 * @param {int}           accountId
 *
 * @returns {string}
 */
joinLoyalty = async (req, res) => {
  const accountId = req.body.accountId;
  try {
    const result = await Loyalty.addCustomerToLoyalty(accountId);
    return res.status(200).json({ message: "Joined loyalty!" });
  } catch (e) {
    if (e.code === "ER_DUP_ENTRY") {
      return res.status(200).json({ message: "Already joined loyalty!" });
    }
    return res.status(500).json({ error: e.message });
  }
};

/**
 * returns loyalty information for an account
 * @param {int}           accountId
 *
 * @returns {Object}      object contains information, otherwise empty
 */
getLoyaltyStatus = async (req, res) => {
  const accountId = req.params.accountId;
  try {
    const statusRes = await Loyalty.checkLoyaltyStatus(accountId);
    if (statusRes.length === 0) {
      return res
        .status(200)
        .json({ message: "Not a member!", isMember: false });
    } else {
      const result = { ...statusRes[0], isMember: true };
      return res.status(200).json(JSON.parse(JSON.stringify(result)));
    }
  } catch (err) {
    return res.status(500).json({ error: "Cannot get loyalty status" });
  }
};

/**
 * given accountId and tableId, retrieves a customers orders, calculates
 * accumulated points and checks if they can upgrade tiers
 * @param {int}           accountId
 * @param {int}           tableId
 *
 * @returns {Object}      object contains information, otherwise empty
 */
updateLoyalty = (req, res) => {
  const { accountId, tableId } = req.body;
  Order.getOrdersForTableId(tableId, async (err, orderResults) => {
    if (err || !orderResults) {
      return res.status(500).json({ error: "Error getting orders" });
    }
    try {
      // get saved points and add on accrued ones from the latest bill
      const accountPoints = await Loyalty.getAccountPoints(accountId);
      let points = accountPoints[0].points;
      const tierId = accountPoints[0].tierId;
      orderResults.forEach((order) => {
        points += order.subtotal * 100;
      });
      // update points
      await Loyalty.updateAccountPoints(points, accountId);
      // find maximum achievable tier (i.e., can skip tiers)
      const maxTierUpgradeRes = await Loyalty.findMaxTierUpgrade(points);
      const maxTierUpgrade = maxTierUpgradeRes[0].id;
      // if they can upgrade, do so
      if (maxTierUpgrade < tierId) {
        await Loyalty.updateAccountTier(maxTierUpgrade, accountId);
        return res.status(200).json({ message: "Updated points and tier" });
      }

      return res.status(200).json({ message: "Updated points" });
    } catch (e) {
      console.error("Error executing queries:", e);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  });
};

module.exports = {
  joinLoyalty,
  getLoyaltyStatus,
  updateLoyalty,
};
