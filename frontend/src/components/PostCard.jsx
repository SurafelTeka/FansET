import React from 'react';
import PropTypes from 'prop-types';
import './PostCard.css';

const PostCard = ({ post }) => (
  <article className="post-card">
    <header className="post-card__header">
      <div className="post-card__avatar" aria-label={`${post.author} avatar`}>
        {post.initials}
      </div>
      <div>
        <strong>{post.author}</strong>
        <p className="post-card__meta">{post.timeAgo}</p>
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

PostCard.propTypes = {
  post: PropTypes.shape({
    author: PropTypes.string.isRequired,
    initials: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    image: PropTypes.string,
    imageAlt: PropTypes.string,
    imageCaption: PropTypes.string,
    timeAgo: PropTypes.string.isRequired
  }).isRequired
};

export default PostCard;
