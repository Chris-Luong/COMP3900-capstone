


const createNewAccount = `
INSERT INTO account VALUES(null, ?, ?, ?, ?, NOW())
`;

const findAllAccounts = `
SELECT * FROM account 
`;

const findAccountByEmail = ' SELECT password, role FROM account WHERE email = ?';

module.exports = {   
    createNewAccount,
    findAllAccounts,
    findAccountByEmail
};