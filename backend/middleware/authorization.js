// middleware for role-based authorization
exports.authorize = (role) => {
    return function(req, res, next) {

      if (JWTdecode(req.token).role === role) {
        // User has the required role
        next(); 
      } else {
        res.status(403).json({ message: 'Access denied. You do not have the permission' });
      }
    };
}
