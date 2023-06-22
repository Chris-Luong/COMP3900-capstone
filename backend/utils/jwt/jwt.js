const jwtConfig = require('./jwt.config.json');
const jwt = require('jsonwebtoken');


const JWTencode = (payload) => jwt.sign(payload, jwtConfig.secret, { expiresIn: jwtConfig.expiresIn});
const JWTdecode = (token) => jwt.verify(token, jwtConfig.secret, (err, decoded) => {
    if (err) { 
      console.error('JWT verification failed:', err);
    } else {
        return decoded;
    }
  });


module.exports = {
    JWTencode,
    JWTdecode
}