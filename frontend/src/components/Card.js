import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function Card(props) {
  //Создаём переменную контекста
  const currentUser = React.useContext(CurrentUserContext);
  //Проверяем принадлежит ли карточка пользователю
  const isOwn = props.card.owner === currentUser._id;
  //Проверяем ставил ли пользователь лайк
  const isLiked = props.card.likes.some((i) => i === currentUser._id);

  //Обработчик клика по карточке. Вызов функции из props
  function handleClick() {
    props.onCardClick(props.card);
  }

  //Обработчик клика по лайку. Вызов функции из props
  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  //Обработчик клика по мусорной корзине. Вызов функции из props
  function handleCardDelete() {
    props.onCardDelete(props.card);
  }

  return (
    <article className='cards__item'>
      <img
        src={props.card.link}
        onClick={handleClick}
        className='cards__image'
        alt={`Изображение ${props.card.name}`}
      />
      {isOwn && (
        <button
          type='button'
          className='cards__delete link'
          onClick={handleCardDelete}
        ></button>
      )}
      <div className='cards__info'>
        <h3 className='cards__title'>{props.card.name}</h3>
        <div className='cards__like-div'>
          <button
            type='button'
            className={`cards__like link ${isLiked && 'cards__like_active'}`}
            onClick={handleLikeClick}
            aria-label='Поставить лайк'
          ></button>
          <p className='cards__likes'>{props.card.likes.length}</p>
        </div>
      </div>
    </article>
  );
}

export default Card;
