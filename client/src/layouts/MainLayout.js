import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

const MainLayout = ({ children }) => {
  const location = useLocation();
  const pathsWithoutFooter = ['/profile', '/my-memories', '/create-memory'];
  const dontShowFooter = pathsWithoutFooter.includes(location.pathname);

  return (
    <div>
      <Header />
      <main>{children}</main>
      {!dontShowFooter && <Footer />}
    </div>
  );
};

export default MainLayout;
