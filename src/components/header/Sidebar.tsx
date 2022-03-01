import React from 'react';
import { Link } from 'react-router-dom';
import styles from './sidebar.module.css';
import Image from '../../images/logo.png';
import { FC } from 'react';
import { auth } from '../../config';

interface opner {
  setOpen: (e: boolean) => void;
}

const Sidebar: FC<opner> = ({ setOpen }) => {
  return (
    <div className={styles.container}>
      <img onClick={() => setOpen(false)} className={styles.image} src={Image} alt="" />
      <Link className={styles.elem} to="/">
        Главная
      </Link>
      {auth.currentUser ? (
        <Link className={styles.elem} to={`/records/${auth.currentUser.uid}`}>
          Мои записи
        </Link>
      ) : (
        <Link to="/login">Войти</Link>
      )}
      <Link className={styles.elem} to="/create">
        Создать
      </Link>
      <div className={styles.logout}>Выйти</div>
    </div>
  );
};

export default Sidebar;
