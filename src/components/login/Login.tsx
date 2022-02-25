import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './login.module.css';
import {
  sendSignInLinkToEmail,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from 'firebase/auth';
import { auth } from '../../config';

const Login = () => {
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const signup = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // send verification mail.
        sendEmailVerification(userCredential.user);
        auth.signOut();
        alert('Email sent');
      })
      .catch(alert);
  };

  return (
    <div className="App">
      <br />
      <br />
      <input
        type="email"
        placeholder="Email"
        onChange={(e) => {
          setemail(e.target.value);
        }}></input>
      <br />
      <br />
      <input
        type="password"
        placeholder="password"
        onChange={(e) => {
          setpassword(e.target.value);
        }}></input>
      <br />
      <br />
      <button onClick={signup}>Sign-up</button>
    </div>
  );
};

export default Login;
