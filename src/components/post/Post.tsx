import { doc, getDoc } from 'firebase/firestore';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { db } from '../../config';
import styles from './post.module.css';

const Post = () => {
  const uid = useLocation().pathname.split('/')[2];
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
  const [data, setData] = useState<any>([]);
  const getRecord = async () => {
    const recordsRef = doc(db, 'records', uid);
    const docSnap = await getDoc(recordsRef);
    setData(docSnap.data());
  };
  useEffect(() => {
    getRecord();
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h4 className={styles.title}>{data.title}</h4>
        <div className={styles.date}>
          Опубликовано: {new Date(data.createdAt).getDate()}{' '}
          {dates[new Date(data.createdAt).getMonth()]} {new Date(data.createdAt).getFullYear()}
        </div>
        <img src={data.imgurl} alt="" className={styles.image} />
        <div className={styles.description}>{data.description}</div>
        <div className={styles.contacts}>Контакты: {data.contacts} </div>
      </div>
    </div>
  );
};

export default Post;
