import React from "react";
import editButtonPic from "../images/edit-button.svg";
import addButtonPic from "../images/add-button-cross.svg";
import Card from "./Card.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__pers-data">
          <button
            type="button"
            onClick={props.onEditAvatar}
            style={{ backgroundImage: `url(${currentUser.avatar})` }}
            className="profile__avatar-button link"
            aria-label="Изменить аватар"
          ></button>
          <div className="profile__details">
            <div className="profile__name-field">
              <h1 className="profile__name">{currentUser.name}</h1>
              <button
                type="button"
                onClick={props.onEditProfile}
                className="profile__edit-button link-transparency link"
                aria-label="Редактировать данные"
              >
                <img
                  src={editButtonPic}
                  className="profile__edit-button-image"
                  alt="Кнопка 'Изменить данные'"
                />
              </button>
            </div>
            <p className="profile__profession">{currentUser.about}</p>
          </div>
        </div>
        <button
          type="button"
          onClick={props.onAddPlace}
          className="profile__add-button link"
          aria-label="Добавить изображение"
        >
          <img
            src={addButtonPic}
            className="profile__add-button-image"
            alt="Кнопка 'Добавить'"
          />
        </button>
      </section>

      <section className="cards" aria-label="Галерея фотографий">
        {props.cards.map((el, i) => (
          <Card
            key={el._id}
            card={el}
            onCardClick={props.onCardClick}
            onCardLike={props.onCardLike}
            onCardDelete={props.onCardDelete}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;
