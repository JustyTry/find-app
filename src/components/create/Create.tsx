import React, { useRef } from 'react';
import { MutableRefObject } from 'react';
import { db, storage } from '../../config';
import { collection, addDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import styles from './create.module.css';

const Create = () => {
  const titleRef = useRef() as MutableRefObject<HTMLInputElement>;
  const contactRef = useRef() as MutableRefObject<HTMLInputElement>;
  const fileRef = useRef() as MutableRefObject<HTMLInputElement>;
  const descRef = useRef() as MutableRefObject<HTMLTextAreaElement>;

  const recordsCollection = collection(db, 'records');

  const handleClick = async () => {
    if (titleRef.current && contactRef.current && descRef.current && fileRef.current) {
      titleRef.current.focus();
      contactRef.current.focus();
      descRef.current.focus();
      fileRef.current.focus();

      const title = titleRef.current.value;
      const contacts = contactRef.current.value;
      const description = descRef.current.value;
      const image = fileRef.current.files![0];

      const storageRef = await ref(storage, image.name);
      await uploadBytes(storageRef, image);
      const imgurl = await getDownloadURL(storageRef);

      const createdAt = new Date().getTime();
      await addDoc(recordsCollection, { title, contacts, description, createdAt, imgurl });
    }
  };

  return (
    <div className={styles.mainCreateContainer}>
      <div className={styles.createContainer}>
        <div className={styles.inputsContainer}>
          <h2>Название</h2>
          <input ref={titleRef} type="text" placeholder="Название" required />
          <h2>Контакты</h2>
          <input ref={contactRef} type="text" placeholder="8-xxx-xxx-xx-xx" required />
          <h2>Описание</h2>
          <textarea ref={descRef} className={styles.descriptionArea}></textarea>
        </div>
        <div>
          <input type="radio" name="status" />
          <label>Нашёл</label>
          <input type="radio" name="status" />
          <label>Потерял</label>
        </div>
        <div>
          <input ref={fileRef} type="file" />
        </div>
        <div>
          <button onClick={handleClick} className={styles.button}>
            Создать
          </button>
        </div>
      </div>
    </div>
  );
};

export default Create;
