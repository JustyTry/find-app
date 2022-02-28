import React, { MutableRefObject, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './login.module.css';
import { useFormik } from 'formik';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../config';

const Login = () => {
  const emailRef = useRef() as MutableRefObject<HTMLInputElement>;
  const passwordRef = useRef() as MutableRefObject<HTMLInputElement>;
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string>('');

  const signIn = (email: string, password: string) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        navigate('/');
      })
      .catch((error) => {
        setErrorMessage('Неверный логин или пароль');
      });
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: () => {
      if (emailRef.current && passwordRef.current) {
        emailRef.current.focus();
        passwordRef.current.focus();

        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        signIn(email, password);
      }
    },
  });
  return (
    <div className={styles.center}>
      <div className={styles.container}>
        <label className={styles.closeBtn} title="close"></label>
        <div className={styles.text}>Авторизация</div>
        <form onSubmit={formik.handleSubmit}>
          <div className={styles.data}>
            <label>Email</label>
            <input type="text" id="login" ref={emailRef} required />
          </div>
          <div className={styles.data}>
            <label>Пароль</label>
            <input type="password" id="pass" ref={passwordRef} required />
          </div>

          <div className={styles.btn}>
            <div className={styles.inner}></div>
            <button style={{ outline: 'none' }} type="submit">
              Войти
            </button>
          </div>

          <div className={styles.signupLink}>
            <div>
              {errorMessage !== '' && <div>{errorMessage}</div>}
              Ещё нет аккаунта?<Link to="/registration">Регистрация</Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
