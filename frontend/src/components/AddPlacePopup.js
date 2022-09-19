import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');

  function handleAddPlaceName(e) {
    setName(e.target.value);
  }

  function handleAddPlaceLink(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdatePlace({
      name: name,
      link: link
    });
  }

  React.useEffect(() => {
    setName('');
    setLink('');
  }, [props.isOpen]);

  return (
    < PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      name='photo-form'
      title='Новое место'
      buttonText='Создать' >
      <input
        onChange={handleAddPlaceName}
        value={name}
        id="caption-input"
        className="popup-form__field"
        name="photo_caption"
        placeholder="Название"
        type="text"
        minLength="2"
        maxLength="30"
        required />
      <span className="span-container caption-input-error" />
      <input
        onChange={handleAddPlaceLink}
        value={link}
        id="link-input"
        className="popup-form__field"
        name="photo_link"
        placeholder="Ссылка на картинку"
        type="url"
        required />
      <span className="span-container link-input-error" />
    </PopupWithForm >
  )
}

export default AddPlacePopup;
