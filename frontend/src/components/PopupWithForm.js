import React from "react";

function PopupWithForm(props) {
  return (
    <div
      className={`popup popup_type_${props.name} popup_transition ${
        props.isOpen ? "popup_opened" : ""
      }`}
      onMouseDown={props.onClose}
    >
      <div
        className="popup__form-container"
        onMouseDown={(e) => {
          e.stopPropagation();
        }}
      >
        <form
          className="popup__container"
          name={`${props.name}Form`}
          onSubmit={props.onSubmit}
        >
          <h2 className="popup__title">{props.title}</h2>

          {props.children}

          <button
            type="button"
            onClick={props.onClose}
            className="popup__close link"
            name="closeBtn"
            aria-label="Закрыть окно"
          ></button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
