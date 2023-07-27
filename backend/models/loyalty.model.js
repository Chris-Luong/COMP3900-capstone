const db = require("../db/db");
const {
  addCustomertoLoyalty,
  checkLoyaltyStatus,
  updatePoints,
  getNextTierPoints,
  getTotalPoints,
  updateTier,
  findMaxTierUpgrade,
} = require("../db/queries/loyalty.queries");

const EXISTS = 409;
const EXISTS_KIND = "exists";

// changed Loyalty class to return promises instead doing the usual callback
// method so that they can be used asynchronously
class Loyalty {
  static addCustomerToLoyalty(accountId, next) {
    return new Promise((resolve, reject) => {
      db.query(addCustomertoLoyalty, accountId, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  }

  static checkLoyaltyStatus(accountId) {
    return new Promise((resolve, reject) => {
      db.query(checkLoyaltyStatus, accountId, (err, results) => {
        if (err) {
          reject(err);
        } else {
          console.log(results);
          resolve(results);
        }
      });
    });
  }

  static updateAccountPoints(points, accountId) {
    return new Promise((resolve, reject) => {
      db.query(updatePoints, [points, accountId], (err, results) => {
        if (err || results.affectedRows !== 1) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  }

  static getAccountPoints(accountId) {
    return new Promise((resolve, reject) => {
      db.query(getTotalPoints, accountId, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  }

  static getNextTierPoints(accountId) {
    return new Promise((resolve, reject) => {
      db.query(getNextTierPoints, accountId, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  }

  static updateAccountTier(tierId, accountId) {
    return new Promise((resolve, reject) => {
      db.query(updateTier, [tierId, accountId], (err, results) => {
        if (err || results.affectedRows !== 1) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  }

  static findMaxTierUpgrade(points) {
    return new Promise((resolve, reject) => {
      db.query(findMaxTierUpgrade, points, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  }
}

module.exports = { Loyalty };
