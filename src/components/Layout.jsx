// Layout.jsx
import Header from "./Header";
import Footer from "./Footer";
import { useLocation } from "react-router-dom";

const Layout = ({ children }) => {
  const location = useLocation();
  const isChatRoute = location.pathname.includes("/chat");

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className={`flex-1 ${isChatRoute ? "pt-16" : "pt-16 pb-16"}`}>
        {children}
      </main>
      {!isChatRoute && <Footer />}
    </div>
  );
};

export default Layout;
