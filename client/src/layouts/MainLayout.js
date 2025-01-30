import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

const MainLayout = ({ children }) => {
  const location = useLocation();
  const isProfilePage = location.pathname === '/profile';

  return (
    <div>
      <Header />
      <main>{children}</main>
      {!isProfilePage && <Footer />}
    </div>
  );
};

export default MainLayout;
