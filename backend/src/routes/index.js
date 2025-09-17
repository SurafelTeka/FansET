import { Router } from 'express';

const router = Router();

router.get('/health', (_req, res) => {
  res.json({ ok: true, timestamp: new Date().toISOString() });
});

router.get('/creators', (_req, res) => {
  res.json([
    { id: 'creator-1', name: 'Josephine Blush', handle: 'josephineb', price: 'Free' },
    { id: 'creator-2', name: 'MaryLover', handle: 'marylover', price: 'Free' },
    { id: 'creator-3', name: 'Your Wife', handle: 'your_wife', price: 'Free' }
  ]);
});

router.get('/posts', (_req, res) => {
  res.json([
    {
      id: 'post-1',
      author: '@onlyfans',
      content:
        'Ready for a forest adventure? Join @nyxx at night in Sequoia National Park, where giant trees and the beauty of nature come to life through her lens.'
    }
  ]);
});

export default router;
