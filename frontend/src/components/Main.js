import React from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick, onCardLike, cards, onCardDelete }) {

  const currentUser = React.useContext(CurrentUserContext);
  const photoCards = cards.map((item) => {

    return (
      <Card
        key={item._id}
        card={item}
        onCardClick={onCardClick}
        onCardLike={onCardLike}
        onCardDelete={onCardDelete}
      />
    );
  });

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__list">
          <a
            onClick={onEditAvatar}
            className="profile__avatar"
            style={{ backgroundImage: `url(${currentUser.avatar})` }} />
          <div className="profile__info">
            <div className="profile__title-info">
              <h1 className="profile__title">{currentUser.name}</h1>
              <button
                onClick={onEditProfile}
                className="profile__edit-button"
                type="button" />
            </div>
            <h2 className="profile__subtitle">{currentUser.about}</h2>
          </div>
        </div>
        <button
          onClick={onAddPlace}
          className="profile__add-photo-button"
          type="button" />
      </section>
      <section className="photo-grid">
        <ul className="photo-grid__cards">
          {photoCards}
        </ul>
      </section>
    </main >
  )
}

export default Main;
