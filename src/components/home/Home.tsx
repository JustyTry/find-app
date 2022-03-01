import React, { useEffect } from 'react';
import { db, storage } from '../../config';
import { collection, getDocs, deleteDoc, doc, getDoc } from 'firebase/firestore';
import { useState } from 'react';
import Record from './Record';
import styles from './home.module.css';
import { deleteObject, ref } from 'firebase/storage';

const Home = () => {
  const [dataRecord, setDataRecord] = useState<any>([]);

  const recordsCollection = collection(db, 'records');

  const getData = async () => {
    const data = await getDocs(recordsCollection);
    setDataRecord(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    getData();
  }, []);

  const deleteItemById = (id: string) => async () => {
    const recordDoc = await doc(db, 'records', id);
    const snap = await getDoc(recordDoc);

    const url = snap.data()!.imgurl;
    const imageRef = ref(storage, url);

    await deleteObject(imageRef);
    await deleteDoc(recordDoc);
    setDataRecord(dataRecord.filter((rec: any) => rec.id !== id));
  };

  return (
    <div className={styles.container}>
      <div className={styles.recordsContainer}>
        {dataRecord
          .sort(function (a: any, b: any) {
            return b.createdAt - a.createdAt;
          })
          .map((rec: any, index: number) => (
            <div key={index}>
              <Record
                id={rec.id}
                title={rec.title}
                uid={rec.uid}
                createdAt={rec.createdAt}
                imgurl={rec.imgurl}
                status={rec.status}
                deleteItem={deleteItemById(rec.id)}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default Home;
