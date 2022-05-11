import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import MyPosts from './pages/MyPosts';
import LikedPosts from './pages/LikedPosts';
import Header from './components/Header';
import SideMenu from './components/SideMenu';

function App() {
  const pathname = window.location.pathname;

  return (
    <Router>
      <Header />
      <div className='w-[1200px] mt-8 mx-auto flex justify-center'>
        { pathname === '/login' || pathname === '/register' ? null : <SideMenu /> }
        <Routes>
          <Route exact path="/" element={ <Home /> } />
          <Route exact path="/login" element={ <Login /> } />
          <Route exact path="/register" element={ <Register /> } />
          <Route exact path="/myPosts" element={ <MyPosts /> } />
          <Route exact path="/likedPosts" element={ <LikedPosts /> } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
