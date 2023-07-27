import React from "react";
import PopupWithForm from "./PopupWithForm.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import { useValidation } from "../hooks/useValidation";

function EditProfilePopup(props) {
  //Создаём переменную контекста
  const currentUser = React.useContext(CurrentUserContext);

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

  //Сброс значений полей попапа изменения данных профиля к дефолтным значениям при закрытии попапа
  React.useEffect(() => {
    if (props.isOpen) {
      resetForm(
        { name: currentUser.name, about: currentUser.about },
        { name: "", about: "" },
        false
      );
    }
  }, [, props.isOpen]);

  //ОБработчик сабмита, вызывающий функцию сохранения данных профиля на сервере, проброшенную из App
  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser(values);
  }

  return (
    <PopupWithForm
      name="profilePopupForm"
      title="Редактировать профиль"
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
              className="popup__input popup__input_name"
              placeholder="Введите имя"
              name="name"
              required
              minLength="2"
              maxLength="40"
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
              type="text"
              value={values.about ? values.about : ""}
              onChange={handleChange}
              className="popup__input popup__input_job"
              placeholder="Введите профессию"
              name="about"
              required
              minLength="2"
              maxLength="200"
            />
            <span
              className={`popup__error ${
                !isValid && props.isOpen ? "popup__input_type_error" : ""
              }`}
            >
              {errors.about}
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

export default EditProfilePopup;
