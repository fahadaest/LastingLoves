import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import store from './redux/store';
import MainLayout from './layouts/MainLayout';
import ProtectedRoute from './routes/protectedRoute';
import Home from './pages/Home';
import Pricing from './pages/Pricing';
import HowItWorks from './pages/HowItWorks';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<MainLayout><Home /></MainLayout>} />
          <Route path="/Pricing" element={<MainLayout><Pricing /></MainLayout>} />
          <Route path="/how-it-works" element={<MainLayout><HowItWorks /></MainLayout>} />
          <Route path="/login" element={<Home />} />
          <Route path="/profile" element={<ProtectedRoute> <MainLayout><Home /></MainLayout> </ProtectedRoute>} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
