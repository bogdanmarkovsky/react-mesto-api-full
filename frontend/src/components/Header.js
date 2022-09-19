import React from "react";
import { Link, Route, Switch } from 'react-router-dom';

function Header(props) {

  return (
    <header className="header">
      <Link
        to="/"
        className="header__logo" />
      <Switch>
        <Route exact path="/sign-in">
          <Link to="/sign-up" className="header__link">
            Регистрация
          </Link>
        </Route>
        <Route exact path="/sign-up">
          <Link to="/sign-in" className="header__link">
            Войти
          </Link>
        </Route>
        <Route exact path="/">
          <div className="header__user-info">
            <p className="header__email">{props.email}</p>
            <Link to='/sign-in' className="header__link header__link_logout" onClick={props.onSignOut}>Выйти</Link>
          </div>
        </Route>
      </Switch>
    </header>
  )
}

export default Header;
