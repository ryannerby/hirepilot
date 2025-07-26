import jwt from 'jsonwebtoken';

export default function requireUser(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.NEXTAUTH_SECRET);
    req.userId = decoded.id;
    next();
  } catch (err) {
    console.error('JWT decode error:', err);
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}
