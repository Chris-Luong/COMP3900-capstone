const { db } = require('../db/db'); 
const bcrypt = require('bcrypt');
const { createNewAccount, findAccountByEmail } = require('../db/queries/accounts.queries');

const NOT_FOUND = 401
const NOT_FOUND_KIND = "not_found"

class Account {
  constructor(firstName, lastName, email, password, role) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.role = role;
  }


  static createAccount(newAccount) {
    pwd = newAccount.password
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const encryptedPwd = bcrypt.hashSync(pwd, salt);
    param = [newAccount.firstName, newAccount.lastName, newAccount.email, encryptedPwd, newAccount.role]

    return db.query(createNewAccount, param)
    .then(results => {
        if (results.length) {
          return results[0];
        } else {
            throw {
                status: 422,
                message: 'Cannot Create The Account',
                kind: 'unprocessed'
            };
        }
      })
      .catch(error => {
        console.error(error);
        throw error;
      });
    }

  static getAccountByEmail(email, pwd) {
    return db.query(findAccountByEmail, email)
      .then(results => {

        if (results.length) {

          res = results[0];
          password = res.password;
          if (bcrypt.compareSync(pwd, password)) {
            return role;
          } else {
            console.log("Incorrect password");
            throw {
                status: NOT_FOUND,
                message: 'Incorrect Password.',
                kind: NOT_FOUND_KIND
            };
          }

        } else {

          console.log("Incorrect username");
          throw {
            status: NOT_FOUND,
            message: 'Incorrect Username.',
            kind: NOT_FOUND_KIND
          };
        }
      })
      .catch(error => {
        console.error(error);
        throw error;
      });
  }
}

module.exports = { Account, NOT_FOUND };
 