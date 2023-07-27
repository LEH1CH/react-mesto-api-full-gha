function ImagePopup(props) {
  return (
    <div
      className={`popup popup_for_full-image popup_transition ${
        props.selectedCard.link ? 'popup_opened' : ''
      }`}
      onMouseDown={props.onClose}
    >
      <div
        className='popup__container-image'
        onMouseDown={(e) => {
          e.stopPropagation();
        }}
      >
        <img
          src={props.selectedCard.link}
          className='popup__full-image'
          alt={props.selectedCard.name}
        />
        <button
          type='button'
          onClick={props.onClose}
          className='popup__close link'
          name='closeBtn'
          aria-label='Закрыть окно'
        ></button>
        <h3 className='popup__caption'>{`Изображение ${props.selectedCard.name}`}</h3>
      </div>
    </div>
  );
}

export default ImagePopup;
