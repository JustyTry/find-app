import React from 'react';
import { Link } from 'react-router-dom';
import styles from './registration.module.css';

const Registration = () => {
    return (
        <div>
            <div className={styles.center}>
                <div className={styles.container}>
                    <label className={styles.closeBtn} title="close"></label>
                    <div className={styles.text}>Регистрация</div>
                    <form action="/login">
                        <div className={styles.data}>
                            <label>Имя</label>
                            <input type="text" required />
                        </div>
                        <div className={styles.data}>
                            <label>Фамилия</label>
                            <input type="text" required />
                        </div>
                        <div className={styles.data}>
                            <label>Email</label>
                            <input type="email" required />
                        </div>
                        <div className={styles.data}>
                            <label>Пароль</label>
                            <input type="password" required />
                        </div>
                        <div className={styles.btn}>
                            <div className={styles.inner}></div>
                            <button style={{ outline: 'none' }} type="submit">
                                Зарегестрироваться
                            </button>
                        </div>
                        <div className={styles.signupLink}>
                            <div>
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
