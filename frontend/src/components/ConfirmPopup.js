import React from "react";
import PopupWithForm from "./PopupWithForm.js";

function ConfirmPopup(props) {
  //Обработчик сабмита. Вызывает обработчик, расположенный в App и переданный через props
  function handleSubmit(e) {
    e.preventDefault();
    props.onSubmit();
  }

  return (
    <PopupWithForm
      name="confirmPopup"
      title="Вы уверены?"
      onSubmit={handleSubmit}
      isOpen={props.isOpen}
      onClose={props.onClose}
      children={
        <button
          type="submit"
          className={`popup__button ${
            props.submitBtnDisabled ? "popup__button_disabled" : ""
          }`}
          name="submitBtn"
          disabled={props.submitBtnDisabled}
        >
          {props.submitBtnCap}
        </button>
      }
    />
  );
}

export default ConfirmPopup;
