import React from 'react';
import { Link } from 'react-router-dom';
import styles from './login.module.css';

const Login = () => {
  return (
    <div className={styles.center}>
      <div className={styles.container}>
        <label className={styles.closeBtn} title="close"></label>
        <div className={styles.text}>Авторизация</div>
        <form>
          <div className={styles.data}>
            <label>Email</label>
            <input type="text" id="login" required />
          </div>
          <div className={styles.data}>
            <label>Пароль</label>
            <input type="password" id="pass" required />
          </div>

          <div className={styles.btn}>
            <div className={styles.inner}></div>
            <button style={{ outline: 'none' }} type="submit">
              Войти
            </button>
          </div>

          <div className={styles.signupLink}>
            <div>
              Ещё нет аккаунта?<Link to="/registration">Регистрация</Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
