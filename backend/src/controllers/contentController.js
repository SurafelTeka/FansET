const DEFAULT_CREATORS = [
  {
    id: 'creator-nova-kai',
    name: 'Nova Kai',
    handle: 'novakai',
    price: 'Free',
    image:
      'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=600&q=80',
    isVerified: true,
    categories: ['VR fitness', 'Livestreams']
  },
  {
    id: 'creator-elysian-tide',
    name: 'Elysian Tide',
    handle: 'elysiantide',
    price: '$12.99',
    image:
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&q=80',
    isVerified: true,
    categories: ['Underwater sets', 'Cinema edits']
  },
  {
    id: 'creator-zen',
    name: 'Zen Haru',
    handle: 'zenharu',
    price: '$7.50',
    image:
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=600&q=80',
    isVerified: false,
    categories: ['Meditation', 'Q&A']
  }
];

const DEFAULT_POSTS = [
  {
    id: 'post-aurora-studio',
    author: 'Aurora Skye',
    handle: '@auroraskye',
    initials: 'AS',
    timeAgo: '2 hours ago',
    content:
      'Studio reset day! Rebuilding the holographic light wall for a neon portrait series inspired by city nights. Full BTS and lighting maps are live for members. ✨',
    image:
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Model adjusting neon lights in a studio set',
    imageCaption: 'Neon Reverie set rebuild'
  },
  {
    id: 'post-nova-training',
    author: 'Nova Kai',
    handle: '@novakai',
    initials: 'NK',
    timeAgo: 'Yesterday',
    content:
      'Uploaded a new 35-minute VR combat session with adaptive difficulty callouts. Turn on captions for form cues and check the PDF playbook in the library. 🥊',
    image:
      'https://images.unsplash.com/photo-1556817411-31ae72fa3ea0?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Athlete training with virtual reality gear',
    imageCaption: 'Adaptive VR routine — episode 12'
  },
  {
    id: 'post-zen-live',
    author: 'Zen Haru',
    handle: '@zenharu',
    initials: 'ZH',
    timeAgo: '3 days ago',
    content:
      'Calm coding stream tonight: building a focus playlist generator for our community. Grab the repo in the notes and drop song requests in chat. ☁️',
    image:
      'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Minimalist desk setup with code on screen',
    imageCaption: 'Live with Zen — session 42'
  }
];

export const listCreators = (_req, res) => {
  res.json({ creators: DEFAULT_CREATORS });
};

export const listPosts = (_req, res) => {
  res.json({ posts: DEFAULT_POSTS });
};
