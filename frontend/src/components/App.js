import React from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import Api from '../utils/Api';
import * as auth from '../utils/auth';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import InfoToolTip from './InfoToolTip';


function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isInfoToolTipPopupOpen, setIsInfoToolTipPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const history = useHistory();
  const [isSuccess, setIsSuccess] = React.useState(false);

  React.useEffect(() => {
    Api.getUserInfoFromServer()
      .then((userData) => {
        setCurrentUser(userData);
        setIsLoggedIn(true);
        setEmail(userData.email);
        history.push("/");
      })
      .catch((err) => console.log(err));
  }, [isLoggedIn, history]);

  React.useEffect(() => {
    if (isLoggedIn) {
      Api.getCardsFromServer()
        .then((cards) => {
          setCards(cards);
        })
        .catch((err) => console.log(err));
    }
  }, [isLoggedIn]);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsInfoToolTipPopupOpen(false);
    setSelectedCard(null);
  }

  function handleCardLike(selectedCard) {
    const isLiked = selectedCard.likes.some(like => like === currentUser._id);
    Api.changeLikeCardStatus(selectedCard._id, isLiked)
      .then((updatedCard) => {
        setCards((state) => state.map((card) => card._id === selectedCard._id ? updatedCard : card));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function handleCardDelete(deletedCard) {
    Api.deleteCardFromServer(deletedCard)
      .then(() => {
        setCards((state) => state.filter((card) => card._id !== deletedCard._id));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function handleUpdateUser(user) {
    Api.setUserInfoOnServer(user.name, user.about)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateAvatar(ava) {
    Api.setAvatarOnServer(ava)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAddPlaceSubmit(card) {
    Api.setCardOnServer(card)
      .then((res) => {
        setCards([res, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleRegisterSubmit(email, password) {
    auth.register(email, password)
      .then(() => {
        setIsInfoToolTipPopupOpen(true);
        setIsSuccess(true);
        history.push("/sign-in");
      })
      .catch((err) => {
        if (err.status === 400) {
          console.log("400 - некорректно заполнено одно из полей");
        }
        setIsInfoToolTipPopupOpen(true);
        setIsSuccess(false);
      });
  }

  function handleLoginSubmit(email, password) {
    auth.login(email, password)
      .then((data) => {
        if (data) {
          setIsLoggedIn(true);
          setEmail(email);
          history.push("/");
        }
      })
      .catch((err) => {
        setIsInfoToolTipPopupOpen(true);
        setIsSuccess(false);
        if (err.status === 400) {
          console.log("400 - не передано одно из полей");
        } else if (err.status === 401) {
          console.log("401 - пользователь с email не найден");
        }
      });
  }

  function handleSignOut() {
    auth.logout()
      .then(() => {
        setIsLoggedIn(false);
        history.push("/sign-in");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>

      <Header
        email={email}
        onSignOut={handleSignOut}
      />

      <Switch>

        <ProtectedRoute
          exact
          path="/"
          component={Main}
          isLoggedIn={isLoggedIn}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
          cards={cards}
        />

        <Route path="/sign-in">
          <Login onLogin={handleLoginSubmit} />
        </Route>

        <Route path="/sign-up">
          <Register onRegister={handleRegisterSubmit} />
        </Route>

        <Route path="*">
          {isLoggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
        </Route>

      </Switch>

      {isLoggedIn && <Footer />}

      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
      />

      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
      />

      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onUpdatePlace={handleAddPlaceSubmit}
      />

      <ImagePopup
        card={selectedCard}
        onClose={closeAllPopups}
      />

      <InfoToolTip
        isOpen={isInfoToolTipPopupOpen}
        onClose={closeAllPopups}
        isSuccess={isSuccess}
      />

    </CurrentUserContext.Provider>
  );
}

export default App;
