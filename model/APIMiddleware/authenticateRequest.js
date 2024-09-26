
const jwt = require('jsonwebtoken');
const User = require('../database/userModel'); 
const { SECRET } = require('../../config'); 

// Middleware to ensure a request is authenticated
const authenticateRequest = async (req, res, next) => {

  const authHeader = req.headers.authorization;
  
  // Verify the presence of the authorization header
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No Authorization Token Found' });
  }

  // Extract the token from the Authorization header
  const token = authHeader.split(' ')[1];

  try {
    // Verify the token and decode the user ID
    const decoded = jwt.verify(token, SECRET);
    
    // Attempt to retrieve the user by their ID to validate existence
    const user = await User.findById(decoded._id).select('_id');
    if (!user) {
      throw new Error('User not found');
    }

    // Attach the user to the request object and move on to the next middleware
    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: 'Request is not authorized. The token is Invalid or expired.' });
  }
};

module.exports = authenticateRequest;
