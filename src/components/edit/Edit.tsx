import React, { useRef, useState } from 'react';
import { MutableRefObject } from 'react';
import { db, storage } from '../../config';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import styles from './edit.module.css';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

const Edit = () => {
  const titleRef = useRef() as MutableRefObject<HTMLInputElement>;
  const contactRef = useRef() as MutableRefObject<HTMLInputElement>;
  const fileRef = useRef() as MutableRefObject<HTMLInputElement>;
  const descRef = useRef() as MutableRefObject<HTMLTextAreaElement>;

  const uid = useLocation().pathname.split('/')[2];
  const recordsCollection = doc(db, 'records', uid);

  const [data, setData] = useState<any>([]);
  const getRecord = async () => {
    const recordsRef = doc(db, 'records', uid);
    const docSnap = await getDoc(recordsRef);
    setData(docSnap.data());
  };

  useEffect(() => {
    getRecord();
  });

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

      await updateDoc(recordsCollection, {
        title: title,
        contacts: contacts,
        description: description,
        imgurl: imgurl,
      });
    }
  };

  return (
    <div className={styles.mainCreateContainer}>
      <div className={styles.createContainer}>
        <div className={styles.inputsContainer}>
          <h2>Название</h2>
          <input
            ref={titleRef}
            type="text"
            placeholder="Название"
            defaultValue={data.title}
            required
          />
          <h2>Контакты</h2>
          <input
            ref={contactRef}
            type="number"
            placeholder="8-xxx-xxx-xx-xx"
            defaultValue={data.contacts}
            required
          />
          <h2>Описание</h2>
          <textarea
            ref={descRef}
            className={styles.descriptionArea}
            defaultValue={data.description}></textarea>
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
            Изменить
          </button>
        </div>
      </div>
    </div>
  );
};

export default Edit;
