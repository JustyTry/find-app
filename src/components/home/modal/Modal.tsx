import React from 'react';
import { FC } from 'react';
import styles from './modal.module.css';

interface modalProps {
  setModalOpen: (e: boolean) => void;
  deleteItem: () => void;
}

const Modal: FC<modalProps> = ({ setModalOpen, deleteItem }) => {
  const handleDelete = () => {
    deleteItem();
    setModalOpen(false);
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <div className={styles.title}>Удалить</div>
        <div className={styles.description}>Вы уверены, что хотите удалить запись?</div>
        <div className={styles.buttonsContainer}>
          <button className={styles.cancelButton} onClick={() => setModalOpen(false)}>
            Отмена
          </button>
          <button className={styles.deleteButton} onClick={handleDelete}>
            Удалить
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
