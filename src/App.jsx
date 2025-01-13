import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import ForgotPassword from "./components/pages/ForgotPassword";
import Support from "./components/pages/Support";
import Dashboard from "./components/pages/Dashboard";
import Skills from "./components/pages/Skills";
import Reviews from "./components/pages/Reviews";
import ProfilePage from "./components/pages/ProfilePage";
import ExchangePage from "./components/pages/ExchangePage";
import MapView from "./components/pages/MapView";
import CategoriesPage from "./components/pages/CategoriesPage";
import ChatListPage from "./components/pages/ChatListPage";
import CommunityPage from "./components/pages/CommunityPage";
import AboutPage from "./components/pages/AboutPage";
import CommunityWritePage from "./components/pages/CommunityWritePage";
import ProfileManagePage from "./components/pages/ProfileManagePage";
import { BrowserRouter } from "react-router-dom";
import "./App.css";

const App = () => {
  // 로그인이 필요한 라우트인지 체크
  const isAuthRoute = (pathname) => {
    const authRoutes = ["/login", "/register", "/forgot-password"];
    return authRoutes.includes(pathname);
  };

  return (
    <React.StrictMode>
      <BrowserRouter basename="/loop-front">
        <Router>
          <ScrollToTop />
          <div className="min-h-screen bg-gray-50">
            {/* 인증 페이지에서는 Header와 Footer를 보여주지 않음 */}
            {!isAuthRoute(window.location.pathname) && <Header />}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/support" element={<Support />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/skills" element={<Skills />} />
              <Route path="/reviews" element={<Reviews />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/profile-manage" element={<ProfileManagePage />} />
              <Route path="/exchange" element={<ExchangePage />} />
              <Route path="/map" element={<MapView />} />
              <Route path="/categories" element={<CategoriesPage />} />
              <Route path="/chats" element={<ChatListPage />} />
              <Route path="/community" element={<CommunityPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/community/write" element={<CommunityWritePage />} />

              {/* 추후 추가될 라우트들 */}
              {/* <Route path="/exchange" element={<Exchange />} /> */}
              {/* <Route path="/reviews" element={<Reviews />} /> */}
              {/* <Route path="/community" element={<Community />} /> */}
            </Routes>
            {!isAuthRoute(window.location.pathname) && <Footer />}
          </div>
        </Router>
      </BrowserRouter>
    </React.StrictMode>
  );
};

export default App;
