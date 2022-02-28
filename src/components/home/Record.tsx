import React from 'react';
import { useState } from 'react';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import Modal from './modal/Modal';
import styles from './record.module.css';
import Image from '../../images/alt.jpg';

interface IRecord {
  title: string;
  uid: number;
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
      <Link className={styles.buttonContainer} to={`/post/${id}`}>
        <div className={styles.recordBox}>
          {modalOpen && <Modal setModalOpen={setModalOpen} deleteItem={deleteItem} />}

          <div>
            <img className={styles.recordImg} src={imgurl} alt="" />
          </div>
          <div className={styles.recordTitle}>{title}</div>
          <div className={styles.date}>
            {new Date(createdAt).getDate()} {dates[new Date(createdAt).getMonth()]}{' '}
            {new Date(createdAt).getFullYear()}
          </div>
        </div>
      </Link>
    </>
  );
};

export default Record;
