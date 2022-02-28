import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';
import Header from './components/header/Header';
import Home from './components/home/Home';
import Create from './components/create/Create';
import Login from './components/login/Login';
import Registration from './components/registration/Registration';
import Edit from './components/edit/Edit';
import './app.css';
import Post from './components/post/Post';
import OwnRecords from './components/ownRecords/OwnRecords';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header />
                <Home />
              </>
            }
          />
          <Route
            path="/records/:id"
            element={
              <>
                <Header />
                <OwnRecords />
              </>
            }
          />
          <Route
            path="/create"
            element={
              <>
                <Header />
                <Create />
              </>
            }
          />
          <Route
            path="/post/:id"
            element={
              <>
                <Header />
                <Post />
              </>
            }
          />
          <Route path="edit/:id" element={<Edit />} />
          <Route
            path="/login"
            element={
              <>
                <Login />
              </>
            }
          />
          <Route
            path="/registration"
            element={
              <>
                <Registration />
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
