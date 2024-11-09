const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).json({ error: 'No token provided' });
    }

    const token = authHeader.split(' ')[1]; 
    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(403).json({ error: 'Invalid token' });
    }
};
const authenticateAndCheckCourier = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; 
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET); 
      const userId = decoded.id;
  
      // Check if user exists in the Couriers table
      const query = 'SELECT * FROM "Couriers" WHERE "user_id" = $1';
      const result = await pool.query(query, [userId]);
  
      if (result.rows.length === 0) {
        return res.status(403).json({ error: 'Only couriers are authorized to perform this action' });
      }
  
      req.user = { id: userId }; 
      next();
    } catch (err) {
      res.status(401).json({ error: 'Invalid token' });
    }
  };
module.exports = authenticate,authenticateAndCheckCourier;
