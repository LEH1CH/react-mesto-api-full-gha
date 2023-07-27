import React from 'react';
import { NavLink } from 'react-router-dom';
import { useValidation } from '../hooks/useValidation';

function AuthForm(props) {
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

  React.useEffect(() => {
    if (props.spanText) {
      resetForm(
        { email: '', password: '' },
        { email: '', password: '' },
        false
      );
    }
  }, [, props.title]);

  function handleSubmit(e) {
    e.preventDefault();
    props.onSubmit(values);
  }

  return (
    <section className='sign'>
      <div className='sign__form-container'>
        <form className='sign__form' name='sign-form' onSubmit={handleSubmit}>
          <h2 className='sign__title'>{props.title}</h2>
          <fieldset className='sign__fieldset'>
            <input
              type='email'
              value={values.email ? values.email : ''}
              onChange={handleChange}
              className='sign__input'
              placeholder='Email'
              name='email'
              required
              minLength='2'
              maxLength='40'
            />
            <span
              className={`popup__error ${
                !isValid ? 'popup__input_type_error' : ''
              }`}
            >
              {errors.email}
            </span>
          </fieldset>
          <fieldset className='sign__fieldset'>
            <input
              type='password'
              value={values.password ? values.password : ''}
              onChange={handleChange}
              className='sign__input'
              placeholder='Пароль'
              name='password'
              required
              minLength='5'
              maxLength='40'
              autoComplete='new-password'
            />
            <span
              className={`popup__error ${
                !isValid ? 'popup__input_type_error' : ''
              }`}
            >
              {errors.password}
            </span>
          </fieldset>
          <button
            type='submit'
            className={`sign__submit-button ${
              !isValid ? 'sign__submit-button_inactive' : ''
            }`}
            name='submitBtn'
            disabled={!isValid}
          >
            {props.submitBtnCap}
          </button>
          {props.spanText ? (
            <span className='sign__span-text'>
              Уже зарегистрированы?{' '}
              <NavLink to='/sign-in' className='sign__link link-transparency'>
                Войти
              </NavLink>
            </span>
          ) : (
            <span className='sign__span-text'>
              Ещё не зарегистрированы?{' '}
              <NavLink to='/sign-up' className='sign__link link-transparency'>
                Регистрация
              </NavLink>
            </span>
          )}
        </form>
      </div>
    </section>
  );
}

export default AuthForm;
