const db  = require('../db/db'); 
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


  static createAccount(newAccount, next) {
    pwd = newAccount.password
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const encryptedPwd = bcrypt.hashSync(pwd, salt);
    param = [newAccount.firstName, newAccount.lastName, newAccount.email, encryptedPwd, newAccount.role]

    return db.query(createNewAccount, param, (err, results) => {
      if (err) {
        console.error(error);
        return next(err, null);
      }

      if (results.length) {
        let result = JSON.parse(JSON.stringify(results)); 
        return next(null, result[0])
      } else {
          return next ({
              status: 422,
              message: 'Cannot Create The Account',
              kind: 'unprocessed'
          }, null);
      }
    })
    }

  static getAccountByEmail(email, pwd, next) {  
    return db.query(findAccountByEmail, email, (err, results) => {
      if (err) {
        console.error(error);
        return next(err, null);
      }
      
      if (results.length) {
        let result = JSON.parse(JSON.stringify(results)); 
        const res = result[0];
        const password = res.password;

        if (bcrypt.compareSync(pwd, password)) {
          return next(null, {
              role: res.role
          });
        } else {
          console.log("Incorrect password");
          return next({
              status: NOT_FOUND,
              message: 'Incorrect Password.',
              kind: NOT_FOUND_KIND
            }, null);
        }
      } else {

        console.log("Incorrect username");
        return next({
            status: NOT_FOUND,
            message: 'Incorrect Username.',
            kind: NOT_FOUND_KIND
          }, null);
        }  
    }
  )
  }
}

module.exports = { Account, NOT_FOUND };
 