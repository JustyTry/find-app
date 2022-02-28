import React from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../../config';
import Logo from '../../images/logo.png';
import styles from './header.module.css';

const Header = () => {
  return (
    <>
      <div className={styles.headerBar}>
        <div className={styles.headerContainer}>
          <div>
            <Link to="/">
              <img className={styles.logo} alt="logo" src={Logo} />
            </Link>
          </div>
          <div className={styles.headerElems}>
            <Link to="/create">
              <div className={styles.createButton}>Подать объявление</div>
            </Link>
            {auth.currentUser ? (
              <div className={styles.createButton}>
                <Link to={`/records/${auth.currentUser.uid}`}>Мои объявления </Link>
                <span onClick={auth.signOut}> Выйти</span>
              </div>
            ) : (
              <div className={styles.authButtons}>
                <Link to="/login">
                  <span>Войти</span>
                </Link>{' '}
                <Link to="/registration">
                  <span>| Зарегестрироваться</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
