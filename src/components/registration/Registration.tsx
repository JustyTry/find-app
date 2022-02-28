import React, { MutableRefObject, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './registration.module.css';
import { auth, db } from '../../config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore';
import { useFormik } from 'formik';

interface errorsInterface {
  name: string;
  surname: string;
  email: string;
  password: string;
}

const Registration = () => {
  const usersCollection = collection(db, 'users');

  const navigate = useNavigate();
  const nameRef = useRef() as MutableRefObject<HTMLInputElement>;
  const surnameRef = useRef() as MutableRefObject<HTMLInputElement>;
  const emailRef = useRef() as MutableRefObject<HTMLInputElement>;
  const passwordRef = useRef() as MutableRefObject<HTMLInputElement>;

  const createUser = (email: string, password: string, name: string, surname: string) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        addDoc(usersCollection, { userId: user.uid, email: email, name: name, surname: surname });
        navigate('/login');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const validate = (values: any) => {
    const errors = {} as errorsInterface;
    if (!values.name) {
      errors.name = 'Required';
    }
    if (!values.surname) {
      errors.surname = 'Required';
    }
    if (!values.email) {
      errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Неверный email';
    }

    if (!values.password) {
      errors.password = 'Required';
    } else if (values.password.length < 6) {
      errors.password = 'Пароль должен быть > 6 символов';
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      surname: '',
      email: '',
      password: '',
    },
    validate,
    onSubmit: () => {
      if (nameRef.current && surnameRef.current && emailRef.current && passwordRef.current) {
        nameRef.current.focus();
        surnameRef.current.focus();
        emailRef.current.focus();
        passwordRef.current.focus();

        const name = nameRef.current.value;
        const surname = surnameRef.current.value;
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        createUser(email, password, name, surname);
      }
    },
  });

  return (
    <div>
      <div className={styles.center}>
        <div className={styles.container}>
          <label className={styles.closeBtn} title="close"></label>
          <div className={styles.text}>Регистрация</div>
          <form onSubmit={formik.handleSubmit}>
            <div className={styles.data}>
              <label>Имя</label>
              <input
                type="text"
                ref={nameRef}
                required
                name="name"
                onChange={formik.handleChange}
              />
            </div>
            <div className={styles.data}>
              <label>Фамилия</label>
              <input
                type="text"
                ref={surnameRef}
                required
                name="surname"
                onChange={formik.handleChange}
              />
            </div>
            <div className={styles.data}>
              <label>Email</label>
              <input
                type="email"
                ref={emailRef}
                required
                name="email"
                onChange={formik.handleChange}
              />
            </div>
            <div className={styles.data}>
              <label>Пароль</label>
              <input
                type="password"
                ref={passwordRef}
                required
                name="password"
                onChange={formik.handleChange}
              />
            </div>
            <div className={styles.btn}>
              <div className={styles.inner}></div>
              <button style={{ outline: 'none' }} type="submit">
                Зарегестрироваться
              </button>
            </div>
            <div className={styles.signupLink}>
              <div>
                {formik.errors.name || formik.errors.surname || formik.errors.password ? (
                  <div>Заполните все поля</div>
                ) : null}
                {formik.errors.email && <div>Неверный email</div>}
                Уже есть аккаунт?<Link to="/login">Войти</Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Registration;
