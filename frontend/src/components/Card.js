import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner === currentUser._id;
  const isLiked = card.likes.some(like => like === currentUser._id);
  const cardDeleteButtonClassName = isOwn ?
    'photo-grid__remove-button'
    :
    'photo-grid__remove-button_hidden';
  const cardLikeButtonClassName = isLiked ?
    'photo-grid__like-button photo-grid__like-button_active'
    :
    'photo-grid__like-button';

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteCard() {
    onCardDelete(card);
  }

  return (
    <li className="photo-grid__card">
      <img
        className="photo-grid__card-image"
        src={card.link}
        alt={card.name}
        onClick={handleClick} />
      <button
        className={cardDeleteButtonClassName}
        onClick={handleDeleteCard}
      />
      <div className="photo-grid__card-content">
        <h4 className="photo-grid__card-text">{card.name}</h4>
        <div className="photo-grid__like-container">
          <button
            className={cardLikeButtonClassName}
            type="button"
            onClick={handleLikeClick} />
          <div className="photo-grid__like-counter">{card.likes.length}</div>
        </div>
      </div>
    </li>
  )
}

export default Card;
