const createNewAccount = `
INSERT INTO account(firstname, lastname, email, password, role) VALUES(?, ?, ?, ?, ?)
`;

const findAllAccounts = `
SELECT * FROM account 
`;

const findAccountByEmail =
  " SELECT accountId, password, role FROM account WHERE email = ?";

const deleteAccountById = `
  DELETE FROM account 
  WHERE accountId = ?
`;

module.exports = {
  createNewAccount,
  findAllAccounts,
  findAccountByEmail,
  deleteAccountById,
};
