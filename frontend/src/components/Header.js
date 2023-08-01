import logo from '../images/header__logo.svg';
import { NavLink } from 'react-router-dom';
import React from 'react';
import useWindowDimensions from '../hooks/useWindowDimensions.js';

function Header(props) {
  const [isBurgerOpen, setIsBurgerOpen] = React.useState(false);
  const { width, height } = useWindowDimensions();

  React.useEffect(
    function () {
      if (width > 600) {
        setIsBurgerOpen(false);
      }
    },
    [width]
  );

  function handleBurgerClick() {
    isBurgerOpen ? setIsBurgerOpen(false) : setIsBurgerOpen(true);
  }

  function handleLogoutClick() {
    props.onBtnClick();
  }

  return (
    <header>
      {isBurgerOpen && props.loggedIn ? (
        <div className='header header_type_burger'>
          <span className='header__email header__email_type_burger'>
            {props.email}
          </span>
          <button
            onClick={handleLogoutClick}
            className='header__btn header__btn_type_text link-transparency link'
          >
            Выйти
          </button>
        </div>
      ) : (
        <></>
      )}

      <div className='header'>
        <img src={logo} className='header__logo' alt='Логотип Mesto' />
        <div className='header__nav'>
          {props.loggedIn ? (
            width > 600 ? (
              <>
                {props.email && (
                  <span className='header__email'>{props.email}</span>
                )}
                <button
                  onClick={handleLogoutClick}
                  className='header__btn header__btn_type_text link-transparency link'
                >
                  Выйти
                </button>
              </>
            ) : (
              <button
                onClick={handleBurgerClick}
                className={
                  isBurgerOpen
                    ? 'header__btn header__btn_type_close link-transparency link'
                    : 'header__btn header__btn_type_burger link-transparency link'
                }
              />
            )
          ) : (
            <NavLink
              to={props.page === '/sign-up' ? '/sign-in' : '/sign-up'}
              className='header__link link-transparency'
            >
              {props.page === '/sign-up' ? 'Войти' : 'Регистрация'}
            </NavLink>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
