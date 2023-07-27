import React from "react";
import PopupWithForm from "./PopupWithForm.js";
import { useValidation } from "../hooks/useValidation";

function AddPlacePopup(props) {
  const {
    values,
    setValues,
    errors,
    setErrors,
    isValid,
    setIsValid,
    handleChange,
    resetForm,
  } = useValidation();

  //Обнуляем инпут при открытии и закрытии попапа
  React.useEffect(() => {
    if (props.isOpen) {
      resetForm({ name: "", link: "" }, { name: "", link: "" }, false);
    }
  }, [props.isOpen]);

  //Обработчик сабмита вызывает функцию сохранения новой карточки из props
  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlace(values);
  }

  return (
    <PopupWithForm
      name="cardPopup"
      title="Новое место"
      onSubmit={handleSubmit}
      isOpen={props.isOpen}
      onClose={props.onClose}
      children={
        <>
          <fieldset className="popup__items">
            <input
              type="text"
              value={values.name ? values.name : ""}
              onChange={handleChange}
              className="popup__input popup__input_card-name"
              placeholder="Введите название места"
              name="name"
              required
              minLength="2"
              maxLength="30"
            />
            <span
              className={`popup__error ${
                !isValid && props.isOpen ? "popup__input_type_error" : ""
              }`}
            >
              {errors.name}
            </span>
          </fieldset>
          <fieldset className="popup__items">
            <input
              type="url"
              value={values.link ? values.link : ""}
              onChange={handleChange}
              className="popup__input popup__input_card-link-image"
              placeholder="Введите ссылку"
              name="link"
              required
            />
            <span
              className={`popup__error ${
                !isValid && props.isOpen ? "popup__input_type_error" : ""
              }`}
            >
              {errors.link}
            </span>
          </fieldset>
          <button
            type="submit"
            className={`popup__button ${
              props.submitBtnDisabled || !isValid
                ? "popup__button_disabled"
                : ""
            }`}
            name="submitBtn"
            disabled={props.submitBtnDisabled || !isValid}
          >
            {props.submitBtnCap}
          </button>
        </>
      }
    />
  );
}

export default AddPlacePopup;
