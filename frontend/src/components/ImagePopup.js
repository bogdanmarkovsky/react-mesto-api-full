import React from "react";

function ImagePopup(props) {

  return (
    <div className={`popup popup_photo-card` + (props.card && ' popup_opened')}>
      <div className="popup__container popup__container_card">
        <img
          className="popup__image"
          src={props.card?.link}
          alt={props.card?.name} />
        <figcaption className="popup__caption">{props.card?.name}</figcaption>
        <button
          id="photo-card-close-button"
          className="popup__close-button"
          onClick={props.onClose}
          type="button" />
      </div>
    </div >
  )
}

export default ImagePopup;
