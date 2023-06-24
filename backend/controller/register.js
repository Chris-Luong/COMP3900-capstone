const { Account, EXISTS } = require('../models/account.model'); 
const { JWTencode } = require('../utils/jwt/jwt');

register = (req, res) => {
  Account.createAccount(req.body, (err, result) => {
    if (err) {
      return res.status(err.status).json({ message: err.message });
    }
    const token = JWTencode(result);
    res.status(200).json({ message: "Registration Successful", token: token }); 
  });
};

module.exports = register;