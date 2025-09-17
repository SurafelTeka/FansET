import React from 'react';
import PropTypes from 'prop-types';
import './CreatorCard.css';

const CreatorCard = ({ creator }) => (
  <div className="creator-card">
    <div className="creator-card__image">
      <img src={creator.image} alt={`${creator.name} preview`} />
      {creator.isVerified && <span className="creator-card__badge">✔</span>}
    </div>
    <div className="creator-card__body">
      <div>
        <h3>{creator.name}</h3>
        <p>@{creator.handle}</p>
      </div>
      <span className="creator-card__price">{creator.price}</span>
    </div>
    <div className="creator-card__actions">
      <button type="button" className="creator-card__primary">
        Subscribe
      </button>
      <button type="button" className="creator-card__secondary">
        For free
      </button>
    </div>
  </div>
);

CreatorCard.propTypes = {
  creator: PropTypes.shape({
    name: PropTypes.string.isRequired,
    handle: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    isVerified: PropTypes.bool
  }).isRequired
};

export default CreatorCard;
