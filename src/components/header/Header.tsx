import React from 'react';
import { Link } from 'react-router-dom';
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

            <div className={styles.authButtons}>
              <Link to="/login">
                <span>Войти</span>
              </Link>{' '}
              <Link to="/registration">
                <span>| Зарегестрироваться</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
