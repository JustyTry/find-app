import React from 'react';
import { useState } from 'react';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import Modal from './modal/Modal';
import styles from './record.module.css';

interface IRecord {
  title: string;
  userId: number;
  description: string;
  imgurl: string;
  status: string;
  id: string;
  deleteItem: () => void;
}

const Record: FC<IRecord> = ({ title, userId, description, imgurl, status, id, deleteItem }) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  return (
    <div className={styles.recordBox}>
      {modalOpen && <Modal setModalOpen={setModalOpen} deleteItem={deleteItem} />}
      <button className={styles.cross} onClick={() => setModalOpen(true)}></button>
      <Link to={`edit/${id}`}>Изменить</Link>
      <div>
        <img className={styles.recordImg} src={imgurl} alt="img" />
      </div>
      <div className={styles.recordTitle}>{title}</div>
      <div className={styles.recordDescription}>{description}</div>
      <Link className={styles.buttonContainer} to="/post">
        <div className={styles.recordButton}>
          <span>Перейти</span>
        </div>
      </Link>
    </div>
  );
};

export default Record;
