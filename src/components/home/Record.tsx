import React from 'react';
import { useState } from 'react';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import Modal from './modal/Modal';
import styles from './record.module.css';
import Edit from '../../images/edit.png';
import Cross from '../../images/close.png';
import { auth } from '../../config';

interface IRecord {
  title: string;
  uid: string;
  createdAt: number;
  imgurl: string;
  status: string;
  id: string;
  deleteItem: () => void;
}

const Record: FC<IRecord> = ({ title, uid, createdAt, imgurl, status, id, deleteItem }) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const dates = [
    'Января',
    'Февраля',
    'Марта',
    'Аперля',
    'Мая',
    'Июня',
    'Июля',
    'Августа',
    'Сентября',
    'Октября',
    'Ноября',
    'Декабря',
  ];
  return (
    <>
      <div className={styles.recordBox}>
        {modalOpen && <Modal setModalOpen={setModalOpen} deleteItem={deleteItem} />}

        <div>
          {auth.currentUser?.uid === uid ||
          auth.currentUser?.uid === 'tUrdMbTdUOflzmsneOdiL5kJfg52' ? (
            <>
              <Link to={`/edit/${id}`}>
                {' '}
                <img src={Edit} alt="" className={styles.pen} />
              </Link>
              <img src={Cross} alt="" className={styles.cross} onClick={() => setModalOpen(true)} />{' '}
            </>
          ) : (
            <></>
          )}
          <Link className={styles.buttonContainer} to={`/post/${id}`}>
            <img className={styles.recordImg} src={imgurl} alt="" />
          </Link>
        </div>
        <Link className={styles.buttonContainer} to={`/post/${id}`}>
          <div className={styles.recordTitle}>{title}</div>
          <div className={styles.date}>
            {new Date(createdAt).getDate()} {dates[new Date(createdAt).getMonth()]}{' '}
            {new Date(createdAt).getFullYear()}
          </div>
        </Link>
      </div>
    </>
  );
};

export default Record;
