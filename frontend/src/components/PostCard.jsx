import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import './PostCard.css';

const getInitials = (name, handle) => {
  if (name) {
    const letters = name
      .split(/\s+/)
      .filter(Boolean)
      .map((part) => part[0]?.toUpperCase() ?? '')
      .join('');

    if (letters) {
      return letters.slice(0, 2);
    }
  }

  if (handle) {
    const trimmed = handle.replace('@', '').trim();
    if (trimmed.length >= 2) {
      return trimmed.slice(0, 2).toUpperCase();
    }
  }

  return 'FE';
};

const PostCard = ({ post }) => {
  const initials = useMemo(() => post.initials || getInitials(post.author, post.handle), [post.author, post.handle, post.initials]);

  return (
    <article className="post-card">
      <header className="post-card__header">
        <div className="post-card__avatar" aria-label={`${post.author} avatar`}>
          {initials}
        </div>
        <div className="post-card__author">
          <strong>{post.author}</strong>
          <p className="post-card__meta">
            {post.handle && <span className="post-card__handle">{post.handle}</span>}
            <span>{post.timeAgo}</span>
          </p>
        </div>
        <button type="button" className="post-card__follow">
          Follow
        </button>
      </header>
      <p className="post-card__content">{post.content}</p>
      {post.image && (
        <div className="post-card__image">
          <img src={post.image} alt={post.imageAlt} />
          {post.imageCaption && <span>{post.imageCaption}</span>}
        </div>
      )}
      <footer className="post-card__footer">
        <button type="button">❤️ 2.1k</button>
        <button type="button">💬 245</button>
        <button type="button">🔁 Share</button>
        <button type="button">🔖 Save</button>
      </footer>
    </article>
  );
};

PostCard.propTypes = {
  post: PropTypes.shape({
    author: PropTypes.string.isRequired,
    handle: PropTypes.string,
    initials: PropTypes.string,
    content: PropTypes.string.isRequired,
    image: PropTypes.string,
    imageAlt: PropTypes.string,
    imageCaption: PropTypes.string,
    timeAgo: PropTypes.string.isRequired
  }).isRequired
};

export default PostCard;
