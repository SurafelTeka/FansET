import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const JWT_SECRET = process.env.JWT_SECRET || 'change-me-in-production';
const JWT_EXPIRY = process.env.JWT_EXPIRES_IN || '7d';

const createToken = (userId) =>
  jwt.sign(
    {
      sub: userId
    },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRY }
  );

const normalizeEmail = (value = '') => value.trim().toLowerCase();
const normalizeUsername = (value = '') => value.trim().toLowerCase();

const sanitizeUser = (user) => user.toSafeObject();

export const register = async (req, res) => {
  try {
    const { email, username, displayName, password, avatarUrl, bio } = req.body ?? {};

    if (!email || !username || !displayName || !password) {
      return res.status(400).json({ error: 'Email, username, display name and password are required.' });
    }

    if (password.length < 8) {
      return res.status(400).json({ error: 'Password must be at least 8 characters long.' });
    }

    const normalizedEmail = normalizeEmail(email);
    const normalizedUsername = normalizeUsername(username);

    const existingUser = await User.findOne({
      $or: [{ email: normalizedEmail }, { username: normalizedUsername }]
    });

    if (existingUser) {
      return res.status(409).json({ error: 'An account with that email or username already exists.' });
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const user = await User.create({
      email: normalizedEmail,
      username: normalizedUsername,
      displayName: displayName.trim(),
      passwordHash,
      avatarUrl: avatarUrl?.trim() ?? '',
      bio: bio?.trim() ?? ''
    });

    const token = createToken(user.id);

    return res.status(201).json({
      user: sanitizeUser(user),
      token
    });
  } catch (error) {
    console.error('Failed to register user', error);
    if (error?.code === 11000) {
      return res.status(409).json({ error: 'That email or username is already registered.' });
    }
    if (error?.name === 'ValidationError') {
      return res.status(400).json({ error: 'Please double-check your details and try again.' });
    }
    return res.status(500).json({ error: 'Unable to create account at this time.' });
  }
};

export const login = async (req, res) => {
  try {
    const { identifier, password } = req.body ?? {};

    if (!identifier || !password) {
      return res.status(400).json({ error: 'Identifier and password are required.' });
    }

    const query = identifier.includes('@')
      ? { email: normalizeEmail(identifier) }
      : { username: normalizeUsername(identifier) };

    const user = await User.findOne(query);

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }

    const token = createToken(user.id);

    return res.json({
      user: sanitizeUser(user),
      token
    });
  } catch (error) {
    console.error('Failed to authenticate user', error);
    return res.status(500).json({ error: 'Unable to sign in at this time.' });
  }
};

export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    return res.json({ user: sanitizeUser(user) });
  } catch (error) {
    console.error('Failed to fetch current user', error);
    return res.status(500).json({ error: 'Unable to load account details.' });
  }
};
