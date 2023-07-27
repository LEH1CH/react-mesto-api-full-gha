export const config = {
  formSelector: '.popup__container',
  fieldSetSelector: '.popup__items',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};

//Данные для api связи с сервером
export const connectionConfig = {
  server: '',
  profileDataPath: 'users/me',
  cardsDataPath: 'cards',
  token: '9015b21c-073a-42b5-b160-2016f514138f',
  group: 'cohort-64',
};

export const authConfig = {
  server: '',
  registerPath: 'signup',
  loginPath: 'signin',
  authCheckPath: 'users/me',
};
