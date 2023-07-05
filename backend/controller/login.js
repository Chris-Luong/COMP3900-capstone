const { Account, NOT_FOUND, NOT_FOUND_KIND } = require('../models/account.model'); 
const { JWTencode } = require('../utils/jwt/jwt');

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

module.exports = login;