import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {

  const avatarContainer = React.useRef();

  function handleSubmitAvatar(e) {
    e.preventDefault();
    props.onUpdateAvatar({
      avatar: avatarContainer.current.value
    });
  }

  React.useEffect(() => {
    avatarContainer.current.value = '';
  }, [props.isOpen]);

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmitAvatar}
      name='change-ava'
      title='Обновить аватар'
      buttonText='Сохранить'>
      <input
        ref={avatarContainer}
        id="ava-input"
        className="popup-form__field"
        name="ava_link"
        placeholder="Ссылка на картинку"
        type="url"
        required />
      <span className="span-container ava-input-error" />
    </PopupWithForm>
  )
}

export default EditAvatarPopup;
