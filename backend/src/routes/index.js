import { Router } from 'express';
import { listCreators, listPosts } from '../controllers/contentController.js';
import authRoutes from './authRoutes.js';

const router = Router();

router.get('/health', (_req, res) => {
  res.json({ ok: true, service: 'fanset-api', timestamp: new Date().toISOString() });
});

router.use('/auth', authRoutes);

router.get('/creators', listCreators);
router.get('/posts', listPosts);

export default router;
