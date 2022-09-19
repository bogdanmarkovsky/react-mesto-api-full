import React from "react";

function Login(props) {
  const [email, setEmail] = React.useState("");
  const [password, setpassword] = React.useState("");

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }
  function handlePasswordChange(e) {
    setpassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onLogin(email, password);
  }

  return (
    <>
      <section className="auth">
        <h2 className="auth__title">Вход</h2>
        <form
          className="auth__form"
          onSubmit={handleSubmit}
        >
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
            type="submit"
          >
            Войти
          </button>
        </form>
      </section>
    </>
  )
}

export default Login;
