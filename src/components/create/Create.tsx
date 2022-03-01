import React, { useRef } from 'react';
import { MutableRefObject } from 'react';
import { auth, db, storage } from '../../config';
import { collection, addDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import styles from './create.module.css';
import { useFormik } from 'formik';

interface errorsInterface {
  title: string;
  description: string;
  contacts: string;
}

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
      const uid = auth.currentUser!.uid;
      const createdAt = new Date().getTime();
      if(fileRef.current.files!.length > 0){
        
      const image = fileRef.current.files![0];

      const storageRef = await ref(storage, image.name);
      await uploadBytes(storageRef, image);

      const imgurl = await getDownloadURL(storageRef);
      
      
      await addDoc(recordsCollection, { uid, title, contacts, description, createdAt, imgurl });
}else{
  const imgurl = ''
  await addDoc(recordsCollection, { uid, title, contacts, description, createdAt, imgurl });
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
    initialValues: {
      description: '',
      contacts: '',
      title: '',
    },
    validate,
    onSubmit: () => {
      handleClick();
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
              value={formik.values.title}
              type="text"
              name="title"
              placeholder="Название"
              onChange={formik.handleChange}
            />
            <h2>Контакты</h2>
            <input
              ref={contactRef}
              value={formik.values.contacts}
              type="text"
              name="contacts"
              placeholder="8-xxx-xxx-xx-xx"
              onChange={formik.handleChange}
            />
            <h2>Описание</h2>
            <textarea
              ref={descRef}
              value={formik.values.description}
              name="description"
              className={styles.descriptionArea}
              onChange={formik.handleChange}></textarea>
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
            <div>Заполните все поля</div>
          ) : null}

          <div>
            <button type="submit" className={styles.button}>
              Создать
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Create;
