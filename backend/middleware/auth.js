const passport = require('passport');

// Middleware to verify JWT token
const authenticateJWT = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (err) {
      return res.status(500).json({ 
        success: false, 
        message: 'Authentication error' 
      });
    }
    
    if (!user) {
      return res.status(401).json({ 
        success: false, 
        message: 'Unauthorized - Invalid or expired token' 
      });
    }
    
    req.user = user;
    next();
  })(req, res, next);
};

// Optional authentication (doesn't fail if not authenticated)
const optionalAuth = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    if (user) {
      req.user = user;
    }
    next();
  })(req, res, next);
};

module.exports = {
  authenticateJWT,
  optionalAuth
};
