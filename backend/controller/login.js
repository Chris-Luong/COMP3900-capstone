const { Account, NOT_FOUND, NOT_FOUND_KIND } = require('../models/account.model'); 

exports.login = (req, res) => {
  const { email, password } = req.body;

  Account.getAccountByEmail(email, password, (err, role) => {
    if (err.kind == NOT_FOUND_KIND) {
      return res.status(err.status).json({ message: err.message });
    }
    if (!user) {
      return res.status(NOT_FOUND).json({ message: "User Not Found" });
    }
 
    // Create and sign JWT token
    // const token = jwt.sign({ userId: user.id }, 'secretkey', { expiresIn: '1h' });

    res.status(200).json({ role: role }); 
  });
};
