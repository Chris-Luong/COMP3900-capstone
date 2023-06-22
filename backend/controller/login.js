const { Account, NOT_FOUND, NOT_FOUND_KIND } = require('../models/account.model'); 
const { JWTencode } = require('../utils/jwt/jwt');

login = (req, res) => {
  const { email, password } = req.body;

  Account.getAccountByEmail(email, password, (err, result) => {
    if (err.kind == NOT_FOUND_KIND) {
      return res.status(err.status).json({ message: err.message });
    }
    if (!user) {
      return res.status(NOT_FOUND).json({ message: "User Not Found" });
    }
    const token = JWTencode(result);
    res.status(200).json({ token: token }); 
  });
};

module.exports = login;