import React from "react";
import { Link } from "react-router-dom";

function Register(props) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onRegister(email, password);
  }

  return (
    <section className="auth">
      <h2 className="auth__title">Регистрация</h2>
      <form
        className="auth__form"
        onSubmit={handleSubmit}>
        <input
          className="auth__form-field"
          onChange={handleEmailChange}
          value={email || ""}
          name="email"
          type="email"
          required
          placeholder="Email"
        />
        <input
          className="auth__form-field"
          onChange={handlePasswordChange}
          value={password || ""}
          name="password"
          type="password"
          required
          placeholder="Пароль"
        />
        <button
          className="auth__form-submit-button"
          type="submit">
          Зарегистрироваться
        </button>
        <div className="auth__signup">
          <p className="auth__signup-title">Уже зарегистрированы?</p>
          <Link
            to="/sign-in"
            className="auth__signup-link"
          >
            Войти
          </Link>
        </div>
      </form>
    </section>
  )
}

export default Register;
