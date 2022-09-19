import React from "react";

function PopupWithForm(props) {
  return (
    <div className={`popup popup_${props.name}` + (props.isOpen && ' popup_opened')}>
      <div className="popup__container">
        <form
          onSubmit={props.onSubmit}
          className="popup-form"
          name={`${props.name}`}
          id={`${props.name}`}
        >
          <h3 className="popup-form__title">{props.title}</h3>
          {props.children};
          <button
            id={`${props.name}-submit-button"`}
            className="popup-form__submit-button"
            type="submit">
            {props.buttonText}
          </button>
        </form>
        <button
          className="popup__close-button"
          onClick={props.onClose}
          type="button" />
      </div>
    </div>
  )
}

export default PopupWithForm;
