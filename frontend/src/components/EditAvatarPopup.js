import React from "react";
import PopupWithForm from "./PopupWithForm.js";
import { useValidation } from "../hooks/useValidation";

function EditAvatarPopup(props) {
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
      resetForm({ link: "" }, { link: "" }, false);
    }
  }, [props.isOpen]);

  //ОБработчик сабмита с сохранением ссылки на новый аватар с помощью функции, проброшенной через props
  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar(values);
  }

  return (
    <PopupWithForm
      name="profileAvaPopupForm"
      title="Обновить аватар"
      onSubmit={handleSubmit}
      isOpen={props.isOpen}
      onClose={props.onClose}
      children={
        <>
          <fieldset className="popup__items">
            <input
              type="url"
              value={values.link ? values.link : ""}
              onChange={handleChange}
              className="popup__input popup__input_avatar-link-image"
              placeholder="Ссылка на картинку"
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

export default EditAvatarPopup;
