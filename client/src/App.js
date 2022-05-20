import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MyPosts from "./pages/MyPosts";
import CheeredPosts from "./pages/CheeredPosts";
import Layout from "./components/Layout";
import { AuthProvider } from "./context/auth";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="myPosts" element={<MyPosts />} />
            <Route path="cheeredPosts" element={<CheeredPosts />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
