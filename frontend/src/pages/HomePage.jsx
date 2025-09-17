
import React from 'react';
import Header from '../components/Header';
import PostCard from '../components/PostCard';
import CreatorCard from '../components/CreatorCard';
import { posts, creators } from '../data/mockData';
import './HomePage.css';

const HomePage = () => (
  <div className="page home">
    <Header title="HOME" subtitle="Compose new post" searchPlaceholder="Search posts">
      <div className="page-header__search page-header__search--wide">
        <span aria-hidden="true">🖊️</span>
        <input type="text" placeholder="Compose new post..." />
      </div>
    </Header>
    <div className="home__body">
      <section className="home__feed">
        {posts.length === 0 && <p className="home__empty">No posts yet.</p>}
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
        <div className="home__footer-links">
          <a href="#">Privacy</a>
          <a href="#">Cookie Notice</a>
          <a href="#">Terms of Service</a>
        </div>
      </section>
      <aside className="home__aside">
        <div className="home__suggestions">
          <div className="home__suggestions-header">
            <h2>Suggestions</h2>
            <button type="button" aria-label="expand suggestions">
              ⤢
            </button>
          </div>
          <div className="home__suggestions-list">
            {creators.map((creator) => (
              <CreatorCard key={creator.id} creator={creator} />
            ))}
          </div>
        </div>
      </aside>
    </div>
  </div>
);

import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import PostCard from '../components/PostCard';
import CreatorCard from '../components/CreatorCard';
import { posts as fallbackPosts, creators as fallbackCreators } from '../data/mockData';
import { apiClient } from '../services/apiClient.js';
import useAuth from '../hooks/useAuth.js';
import './HomePage.css';

const HomePage = () => {
  const { token } = useAuth();
  const [posts, setPosts] = useState(fallbackPosts);
  const [creators, setCreators] = useState(fallbackCreators);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    const fetchContent = async () => {
      try {
        setLoading(true);
        const [postsResponse, creatorsResponse] = await Promise.all([
          apiClient('/posts', { token }),
          apiClient('/creators', { token })
        ]);

        if (!isMounted) {
          return;
        }

        if (postsResponse?.posts?.length) {
          setPosts(postsResponse.posts);
        } else {
          setPosts(postsResponse?.posts ?? []);
        }

        if (creatorsResponse?.creators?.length) {
          setCreators(creatorsResponse.creators);
        } else {
          setCreators(creatorsResponse?.creators ?? []);
        }

        setError('');
      } catch (err) {
        console.warn('Unable to load FansET feed', err);

        if (!isMounted) {
          return;
        }

        setPosts(fallbackPosts);
        setCreators(fallbackCreators);
        setError('Unable to reach FansET servers. Showing offline data.');
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchContent();

    return () => {
      isMounted = false;
    };
  }, [token]);

  return (
    <div className="page home">
      <Header title="HOME" subtitle="Compose new post" searchPlaceholder="Search posts">
        <div className="page-header__search page-header__search--wide">
          <span aria-hidden="true">🖊️</span>
          <input type="text" placeholder="Compose new post..." />
        </div>
      </Header>
      <div className="home__body">
        <section className="home__feed">
          {loading && <p className="home__status">Loading the latest drops…</p>}
          {!loading && posts.length === 0 && <p className="home__empty">No posts yet.</p>}
          {error && <p className="home__status home__status--warning">{error}</p>}
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
          <div className="home__footer-links">
            <a href="#">Privacy</a>
            <a href="#">Cookie Notice</a>
            <a href="#">Terms of Service</a>
          </div>
        </section>
        <aside className="home__aside">
          <div className="home__suggestions">
            <div className="home__suggestions-header">
              <h2>Suggestions</h2>
              <button type="button" aria-label="expand suggestions">
                ⤢
              </button>
            </div>
            <div className="home__suggestions-list">
              {creators.map((creator) => (
                <CreatorCard key={creator.id} creator={creator} />
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};


export default HomePage;
