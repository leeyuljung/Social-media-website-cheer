import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SinglePost from "./pages/SinglePost";
import MyPosts from "./pages/MyPosts";
import CheeredPosts from "./pages/CheeredPosts";
import Layout from "./components/Layout";
import ProtectedRoutes from "./components/ProtectedRoutes";
import PublicRoutes from "./components/PublicRoutes";
import { AuthProvider } from "./context/auth";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<PublicRoutes />}>
            <Route path="/login" element={<Login />} />
          </Route>
          <Route path="/register" element={<PublicRoutes />}>
            <Route path="/register" element={<Register />} />
          </Route>
          <Route path="/" element={<ProtectedRoutes />}>
            <Route path="/" element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/post/:postId" element={<SinglePost />} />
              <Route path="myPosts" element={<MyPosts />} />
              <Route path="cheeredPosts" element={<CheeredPosts />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
