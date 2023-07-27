import React, { useState } from 'react';
import {
  Navigate,
  useNavigate,
  useLocation,
  Routes,
  Route,
} from 'react-router-dom';
import '../pages/index.css';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import ConfirmPopup from './ConfirmPopup.js';
import ImagePopup from './ImagePopup.js';
import api from '../utils/Api.js';
import auth from '../utils/Auth.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import AuthForm from './AuthForm.js';
import Page404 from './Page404.js';
import ProtectedRouteElement from './ProtectedRoute.js';
import InfoTooltip from './InfoTooltip.js';

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  //Переменные состояний
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
  const [isInfoTooltipOpen, setInfoTooltipOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({ name: '', link: '' });
  const [currentUser, setCurrentUser] = useState({
    name: '',
    about: '',
    avatar: '',
  });
  const [cards, setCards] = useState([]);
  const [cardToDelete, setCardToDelete] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoggedUp, setIsLoggedUp] = useState(false);
  const [page, setPage] = useState('');
  const [email, setEmail] = useState('');

  //Получаем с сервера данные пользователя
  React.useEffect(
    function () {
      if (isLoggedIn) {
        api
          .getProfileData()
          .then((data) => {
            setCurrentUser(data);
          })
          .catch((err) => {
            alert(`Не удалось загрузить данные профиля! Ошибка: ${err}`);
          });
      }
    },
    [isLoggedIn]
  );

  //Получаем с сервера данные карточек
  React.useEffect(
    function () {
      if (isLoggedIn) {
        api
          .getInitialCards()
          .then((data) => {
            setCards(data);
          })
          .catch((err) => {
            alert(`Не удалось загрузить данные карточек! Ошибка: ${err}`);
          });
      }
    },
    [isLoggedIn]
  );

  //Проверяем аутентифицирован ли пользователь
  React.useEffect(() => {
    handleAuthCheck();
  }, []);

  //Определяем текущую страницу
  React.useEffect(() => {
    setPage(location.pathname);
  }, [location]);

  //Добавляем нажатие на кнопки для закрытия попапов через Esc
  React.useEffect(() => {
    document.addEventListener('keydown', handleEscPress);
  }, []);

  //Обработчик нажатия на кнопку Esc
  function handleEscPress(e) {
    if (e.key === 'Escape') {
      closeAllPopups();
    }
  }

  //Обработчик клика на аватар
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  //Обработчик клика на кнопку редактирования профиля
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  //Обработчик клика на кнопку добавления карточки
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  //Закрытие всех попапов и обнуление переменных состояния
  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsConfirmPopupOpen(false);
    setInfoTooltipOpen(false);
    setSelectedCard({ name: '', link: '' });
    setCardToDelete(null);
  }

  //Обработчик клика по карточке
  function handleCardClick(card) {
    setSelectedCard(card);
  }

  //Обработчик клика по лайку
  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        alert(`Не удалось поставить лайк! Ошибка: ${err}`);
      });
  }

  //Обработчик клика по иконке с корзиной
  function handleCardDelete(card) {
    setCardToDelete(card);
    setIsConfirmPopupOpen(true);
  }

  //Обработчик удаления карточки после подтверждения в соответствующем попапе
  function handleConfirmCardDelete() {
    setIsSaving(true);
    api
      .deleteCard(cardToDelete._id)
      .then((newCard) => {
        setCards((state) => state.filter((c) => c._id !== cardToDelete._id));
        closeAllPopups();
      })
      .catch((err) => {
        alert(`Не удалось удалить карточку! Ошибка: ${err}`);
      })
      .finally(() => setTimeout(() => setIsSaving(false), 1000));
  }

  //Обработчик сохранения новых данных пользователя на сервере
  function handleUpdateUser(newProfileData) {
    setIsSaving(true);
    api
      .modifyProfileData(newProfileData)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        alert(`Не удалось сохранить новые данные профиля! Ошибка: ${err}`);
      })
      .finally(() => setTimeout(() => setIsSaving(false), 1000));
  }

  //Обработчик сохранения новых данных аватара на сервере
  function handleUpdateAvatar(newLink) {
    setIsSaving(true);
    api
      .setUserAvatar(newLink)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        alert(`Не удалось сохранить новый аватар! Ошибка: ${err}`);
      })
      .finally(() => setTimeout(() => setIsSaving(false), 1000));
  }

  //Обработчик сохранения новой карточки места на сервере
  function handleAddPlaceSubmit(newPlaceData) {
    setIsSaving(true);
    api
      .addNewCard(newPlaceData)
      .then((data) => {
        setCards([data, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        alert(`Не удалось сохранить новое место! Ошибка: ${err}`);
      })
      .finally(() => setTimeout(() => setIsSaving(false), 1000));
  }

  //Обработчик регистрации нового пользователя на сервере
  function handleRegisterSubmit(newUserData) {
    auth
      .register(newUserData)
      .then((data) => {
        setIsLoggedUp(true);
        navigate('/sign-in', { replace: true });
      })
      .catch((err) => {
        setIsLoggedUp(false);
        console.log(`Не удалось зарегистрировать пользователя! Ошибка: ${err}`);
      })
      .finally(() => setInfoTooltipOpen(true));
  }

  //Обработчик авторизации пользователя на сервере
  function handleLoginSubmit(userData) {
    auth
      .login(userData)
      .then((data) => {
        localStorage.setItem('token', data.token);
        setIsLoggedUp(true);
        setIsLoggedIn(true); // Устанавливаем флаг аутентификации в true
        setEmail(userData.email); // Записываем email пользователя
        navigate('/cards', { replace: true });
        handleAuthCheck();
      })
      .catch((err) => {
        setIsLoggedUp(false);
        setInfoTooltipOpen(true);
        console.log(`Не удалось войти в систему! Ошибка: ${err}`);
      });
  }

  //Обработчик авторизации пользователя на сервере
  function handleLogout() {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setEmail('');
    navigate('/sign-in', { replace: true });
  }

  //Обработчик проверки выполненной авторизации
  function handleAuthCheck() {
    const jwt = localStorage.getItem('token');
    if (jwt) {
      auth
        .authCheck(jwt)
        .then(({ data }) => {
          setIsLoggedIn(true);
          setEmail(data.email);
          navigate('/cards', { replace: true });
        })
        .catch((err) => {
          alert(`Не удалось войти в систему! Ошибка: ${err}`);
        });
    }
  }

  return (
    <div className='page'>
      <CurrentUserContext.Provider value={currentUser}>
        <Header
          loggedIn={isLoggedIn}
          email={email}
          onBtnClick={handleLogout}
          page={page}
        />
        <Routes>
          <Route
            path='/sign-up'
            element={
              <AuthForm
                submitBtnCap='Зарегистрироваться'
                title='Регистрация'
                onSubmit={handleRegisterSubmit}
                spanText={true}
              />
            }
          />
          <Route
            path='/sign-in'
            element={
              <AuthForm
                submitBtnCap='Войти'
                title='Вход'
                onSubmit={handleLoginSubmit}
                spanText={false}
              />
            }
          />
          <Route
            path='/'
            element={
              isLoggedIn ? (
                <Navigate to='/cards' replace />
              ) : (
                <Navigate to='/sign-in' replace />
              )
            }
          />
          <Route path='*' element={<Page404 />} />
          <Route
            path='/cards'
            element={
              <ProtectedRouteElement
                element={Main}
                loggedIn={isLoggedIn}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
                cards={cards}
              />
            }
          />
        </Routes>
        <Footer />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          submitBtnCap={!isSaving ? 'Сохранить' : 'Сохранение...'}
          submitBtnDisabled={isSaving}
          onUpdateUser={handleUpdateUser}
          onClose={closeAllPopups}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          submitBtnCap={!isSaving ? 'Сохранить' : 'Сохранение...'}
          submitBtnDisabled={isSaving}
          onUpdateAvatar={handleUpdateAvatar}
          onClose={closeAllPopups}
        />
        <ConfirmPopup
          isOpen={isConfirmPopupOpen}
          submitBtnCap={!isSaving ? 'Да' : 'Удаление...'}
          submitBtnDisabled={isSaving}
          onSubmit={handleConfirmCardDelete}
          onClose={closeAllPopups}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          submitBtnCap={!isSaving ? 'Создать' : 'Сохранение...'}
          submitBtnDisabled={isSaving}
          onAddPlace={handleAddPlaceSubmit}
          onClose={closeAllPopups}
        />
        <ImagePopup selectedCard={selectedCard} onClose={closeAllPopups} />
        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          isOk={isLoggedUp}
          onClose={closeAllPopups}
        />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
