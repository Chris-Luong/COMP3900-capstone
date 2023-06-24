


const createNewAccount = `
INSERT INTO account(firstname, lastname, email, password, role) VALUES(?, ?, ?, ?, ?)
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