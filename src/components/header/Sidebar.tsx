import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './sidebar.module.css';
import HomeIcon from '../../images/home.png';
import CreateIcon from '../../images/create.png';
import FolderIcon from '../../images/folder.png';
import LogoutIcon from '../../images/logout.png';
import { FC } from 'react';
import { auth } from '../../config';
import { useRef } from 'react';
import { MutableRefObject } from 'react';
import Logout from '../../hooks/Logout';

interface opner {
  setOpen: (e: boolean) => void;
  open: boolean;
}

const Sidebar: FC<opner> = ({ setOpen, open }) => {
  const sidebarRef = useRef() as MutableRefObject<HTMLDivElement>;

  const [aunthificated, setAunthificated] = useState<boolean>(false);
  useEffect(() => {
    auth.onAuthStateChanged(function (user) {
      if (user) {
        setAunthificated(true);
      } else {
        setAunthificated(false);
      }
    });
  }, [setAunthificated]);

  if (open && sidebarRef.current) {
    sidebarRef.current.focus();
    sidebarRef.current.style.width = '75vw';
  } else if (sidebarRef.current) {
    sidebarRef.current.focus();
    sidebarRef.current.style.width = '0';
  }

  return (
    <div ref={sidebarRef} className={styles.container}>
      <div className={styles.crossBox}>
        <span className={styles.cross} onClick={() => setOpen(false)}>
          &times;
        </span>
      </div>
      <div className={styles.actionList}>
        <div className={styles.listItem} onClick={() => setOpen(false)}>
          <Link to="/">
            <img src={HomeIcon} alt="" className={styles.listimg} /> Главная
          </Link>
        </div>
        <div className={styles.listItem} onClick={() => setOpen(false)}>
          <Link to={aunthificated ? '/create' : '/login'}>
            {' '}
            <img src={CreateIcon} alt="" className={styles.listimg} /> Создать
          </Link>
        </div>
        <div className={styles.listItem} onClick={() => setOpen(false)}>
          <Link to={aunthificated ? `/records/${auth.currentUser?.uid}` : '/login'}>
            <img src={FolderIcon} alt="" className={styles.listimg} /> Мои объявления
          </Link>
        </div>
        {aunthificated ? (
          <div onClick={() => Logout(setAunthificated)}>
            <div className={styles.listItem} onClick={() => setOpen(false)}>
              <img src={LogoutIcon} alt="" className={styles.listimg} /> Выйти
            </div>
          </div>
        ) : (
          <Link to="/login">
            <div className={styles.listItem} onClick={() => setOpen(false)}>
              <img src={LogoutIcon} alt="" className={styles.listimg} /> Войти
            </div>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
