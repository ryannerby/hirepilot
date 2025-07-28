import { jwtDecrypt } from 'jose';
import hkdf from '@panva/hkdf';

const { NEXTAUTH_SECRET } = process.env;

async function getDerivedEncryptionKey(keyMaterial, salt) {
  return await hkdf(
    'sha256',
    keyMaterial,
    salt,
    `NextAuth.js Generated Encryption Key${salt ? ` (${salt})` : ''}`,
    32
  );
}

async function decryptNextAuthToken(token, secret) {
  try {
    const encryptionKey = await getDerivedEncryptionKey(secret, '');
    const { payload } = await jwtDecrypt(token, encryptionKey);
    return payload;
  } catch (error) {
    console.error('NextAuth token decryption failed:', error);
    return null;
  }
}

export default async function requireUser(req, res, next) {
  if (!NEXTAUTH_SECRET) {
    console.error('NEXTAUTH_SECRET is not set in the server environment');
    return res.status(500).json({ error: 'Server misconfigured' });
  }

  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = await decryptNextAuthToken(token, NEXTAUTH_SECRET);
    if (!decoded || !decoded.id) {
      return res.status(401).json({ error: 'Invalid or expired token' });
    }
    req.userId = decoded.id;
    next();
  } catch (err) {
    console.error('JWT decode error:', err);
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}
