import React, { useRef, useState } from 'react';
import { MutableRefObject } from 'react';
import { db, storage } from '../../config';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import styles from './edit.module.css';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useFormik } from 'formik';

interface errorsInterface {
  title: string;
  description: string;
  contacts: string;
}

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

      if (fileRef.current.files!.length > 0) {
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
      } else {
        await updateDoc(recordsCollection, {
          title: title,
          contacts: contacts,
          description: description,
          imgurl: data.imgurl,
        });
      }
    }
  };

  const validate = (values: any) => {
    const errors = {} as errorsInterface;
    if (!values.title) {
      errors.title = 'Required';
    }
    if (!values.contacts) {
      errors.contacts = 'Required';
    }
    if (!values.description) {
      errors.description = 'Required';
    }

    return errors;
  };

  const formik = useFormik({
    validateOnChange: false,
    initialValues: {
      title: data.title,
      contacts: data.contacts,
      description: data.description,
    },
    validate,
    onSubmit: (values, { resetForm }) => {
      handleClick();
      resetForm();
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className={styles.mainCreateContainer}>
        <div className={styles.createContainer}>
          <div className={styles.inputsContainer}>
            <h2>Название</h2>
            <input
              ref={titleRef}
              type="text"
              name="title"
              placeholder="Название"
              onChange={formik.handleChange}
              defaultValue={data.title}
            />
            <h2>Контакты</h2>
            <input
              ref={contactRef}
              defaultValue={data.contacts}
              type="text"
              name="contacts"
              placeholder="8xxxxxxxxxx"
              onChange={formik.handleChange}
            />
            <h2>Описание</h2>
            <textarea
              ref={descRef}
              value={formik.values.description}
              name="description"
              className={styles.descriptionArea}
              onChange={formik.handleChange}
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
          {formik.errors.contacts || formik.errors.description || formik.errors.title ? (
            <div className={styles.errorMessage}>Заполните все поля</div>
          ) : null}

          <div>
            <button type="submit" className={styles.button}>
              Изменить
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Edit;
