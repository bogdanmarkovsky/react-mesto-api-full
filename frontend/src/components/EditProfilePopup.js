import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup(props) {

  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      name='profile-form'
      title='Редактировать профиль'
      buttonText='Сохранить'>
      <input
        onChange={handleNameChange}
        value={name || ""}
        id="name-input"
        className="popup-form__field"
        name="name"
        placeholder="Имя профиля"
        type="text"
        minLength="2"
        maxLength="40"
        required />
      <span className="span-container name-input-error" />
      <input
        onChange={handleDescriptionChange}
        value={description || ""}
        id="job-input"
        className="popup-form__field"
        name="about"
        placeholder="Род деятельности"
        type="text"
        minLength="2"
        maxLength="200"
        required />
      <span className="span-container job-input-error" />
    </PopupWithForm>
  )
}

export default EditProfilePopup;
