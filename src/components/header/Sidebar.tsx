import React from 'react';
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

interface opner {
  setOpen: (e: boolean) => void;
  open: boolean;
}

const Sidebar: FC<opner> = ({ setOpen, open }) => {
  const sidebarRef = useRef() as MutableRefObject<HTMLDivElement>;

  if (open && sidebarRef.current) {
    sidebarRef.current.focus();
    sidebarRef.current.style.width = '60vw';
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
          <Link to="/create">
            {' '}
            <img src={CreateIcon} alt="" className={styles.listimg} /> Создать
          </Link>
        </div>
        <div className={styles.listItem} onClick={() => setOpen(false)}>
          <Link to={`/records/${auth.currentUser?.uid}`}>
            <img src={FolderIcon} alt="" className={styles.listimg} /> Мои объявления
          </Link>
        </div>
        {auth.currentUser && (
          <div className={styles.listItem} onClick={() => setOpen(false)}>
            <img src={LogoutIcon} alt="" className={styles.listimg} /> Выйти
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
