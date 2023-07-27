import React from "react";
import granted from "../images/granted.svg";
import denied from "../images/denied.svg";

function InfoTooltip(props) {
  return (
    <div
      className={`popup popup_type_${props.name} popup_transition ${
        props.isOpen ? "popup_opened" : ""
      }`}
      onMouseDown={props.onClose}
    >
      <div
        className="popup__form-container popup__form-container_type_infoTooltip"
        onMouseDown={(e) => {
          e.stopPropagation();
        }}
      >
        <img
          src={props.isOk ? granted : denied}
          className="popup__logo"
          alt={
            props.isOk
              ? `Вы успешно зарегистрировались!`
              : `Что-то пошло не так! Попробуйте ещё раз.`
          }
        />
        <h2 className="popup__title popup__title_type_infoTooltip">
          {props.isOk
            ? `Вы успешно зарегистрировались!`
            : `Что-то пошло не так! Попробуйте ещё раз.`}
        </h2>
        <button
          type="button"
          onClick={props.onClose}
          className="popup__close link"
          name="closeBtn"
          aria-label="Закрыть окно"
        ></button>
      </div>
    </div>
  );
}

export default InfoTooltip;
