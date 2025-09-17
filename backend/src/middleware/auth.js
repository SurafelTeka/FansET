import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const JWT_SECRET = process.env.JWT_SECRET || 'change-me-in-production';

const auth = async (req, res, next) => {
  const authorizationHeader = req.headers.authorization || '';

  const [scheme, rawToken] = authorizationHeader.split(' ');

  if (scheme?.toLowerCase() !== 'bearer' || !rawToken) {
    return res.status(401).json({ error: 'Authentication required.' });
  }

  const token = rawToken.trim();

  try {
    const payload = jwt.verify(token, JWT_SECRET);

    const user = await User.findById(payload.sub);

    if (!user) {
      return res.status(401).json({ error: 'Authentication required.' });
    }

    req.user = { id: user.id };

    return next();
  } catch (error) {
    console.error('Failed to verify token', error);
    return res.status(401).json({ error: 'Invalid or expired token.' });
  }
};

export default auth;
