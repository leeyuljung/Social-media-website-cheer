import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import MyPosts from './pages/MyPosts';
import CheeredPosts from './pages/CheeredPosts';
import Header from './components/Header';
import SideMenu from './components/SideMenu';
import Notifications from './components/Notifications';

function App() {
  const pathname = window.location.pathname;

  return (
    <Router>
      { pathname === '/login' || pathname === '/register' ? null : <Header /> }
      <div className='w-[1500px] mt-8 mx-auto flex'>
        { pathname === '/login' || pathname === '/register' ? null : <SideMenu /> }
        <Routes>
          <Route exact path="/" element={ <Home /> } />
          <Route exact path="/login" element={ <Login /> } />
          <Route exact path="/register" element={ <Register /> } />
          <Route exact path="/myPosts" element={ <MyPosts /> } />
          <Route exact path="/cheeredPosts" element={ <CheeredPosts /> } />
        </Routes>
        { pathname === '/login' || pathname === '/register' ? null : <Notifications /> }
      </div>
    </Router>
  );
}

export default App;
