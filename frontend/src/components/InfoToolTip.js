import React from "react";
import successIcon from "../images/success-icon.svg";
import failIcon from "../images/fail-icon.svg";

function InfoToolTip(props) {
  return (
    <div className={`popup` + (props.isOpen ? ' popup_opened' : '')}>
      <div className='popup__container'>
        <form className="popup-form">
          <img
            className='popup__icon'
            src={props.isSuccess ?
              successIcon :
              failIcon}
            alt={props.isSuccess ?
              "Вы успешно зарегистрировались!" :
              "Что-то пошло не так! Попробуйте ещё раз."} />
          <h2 className='popup-form__title popup-form__title-tooltip'>
            {props.isSuccess ?
              "Вы успешно зарегистрировались!" :
              "Что-то пошло не так! Попробуйте ещё раз."}
          </h2>
        </form>
        <button
          className="popup__close-button"
          onClick={props.onClose}
          type="button"
        />
      </div>
    </ div >
  );
}

export default InfoToolTip;
