const {
  Account,
  EXISTS,
  NOT_FOUND,
  NOT_FOUND_KIND,
} = require("../models/account.model");
const { JWTencode } = require("../utils/jwt/jwt");

/**
 * registers a user
 * @param {string}           email
 * @param {string}           password
 * @param {string}           firstName
 * @param {string}           lastName
 * @param {int}              role             account role
 *
 * @returns {object}
 */
register = (req, res) => {
  Account.createAccount(req.body, (err, result) => {
    if (err) {
      return res.status(err.status).json({ message: err.message });
    }
    const token = JWTencode(result);
    res.status(200).json({
      message: "Registration Successful",
      token: token,
    });
  });
};

/**
 * login a user
 * @param {string}           email
 * @param {string}           password
 *
 * @returns {object}
 */
login = (req, res) => {
  const { email, password } = req.body;
  Account.getAccountByEmail(email, password, (err, result) => {
    if (err) {
      return res.status(err.status).json({ message: err.message });
    }
    if (!result) {
      return res.status(NOT_FOUND).json({ message: "User Not Found" });
    }
    const token = JWTencode(result);
    return res.status(200).json({ message: "Login Successful", token: token });
  });
};

/**
 * deletes a user
 * @param {int}           id
 *
 * @returns {object}
 */
deleteAccount = (req, res) => {
  const { id } = req.body;
  Account.deleteAccountById(id, (err, result) => {
    if (err) {
      return res.status(err.status).json({ message: err.message });
    }
    if (!result) {
      return res.status(NOT_FOUND).json({ message: "Error deleting user" });
    }
    return res.status(200).json({ message: "Delete Successful" });
  });
};

module.exports = { login, register, deleteAccount };
