


const createNewAccount = `
INSERT INTO accounts VALUES(null, ?, ?, ?, ?, NOW())
`;

const findAllAccounts = `
SELECT * FROM accounts 
`;

const findAccountByEmail = `
SELECT password, role FROM accounts WHERE email = ?
`;

module.exports = {   
    createNewAccount,
    findAllAccounts,
    findAccountByEmail
};