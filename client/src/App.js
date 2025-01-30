import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import store from './redux/store';
import MainLayout from './layouts/MainLayout';
import ProtectedRoute from './routes/protectedRoute';
import Home from './pages/Home';
import Pricing from './pages/Pricing';
import HowItWorks from './pages/HowItWorks';
import PersonalizedVideoMessages from './pages/PVMAdditionals';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<MainLayout><Home url={"home"} /></MainLayout>} />
          <Route path="/about" element={<MainLayout><Home url={"about"} /></MainLayout>} />
          <Route path="/Services" element={<MainLayout><Home url={"services"} /></MainLayout>} />
          <Route path="/Contact" element={<MainLayout><Home url={"contact"} /></MainLayout>} />

          <Route path="/Pricing" element={<MainLayout><Pricing /></MainLayout>} />
          <Route path="/how-it-works" element={<MainLayout><HowItWorks /></MainLayout>} />
          <Route path="/personalized-video-messages" element={<MainLayout><PersonalizedVideoMessages page={"PVM"} /></MainLayout>} />
          <Route path="/scheduled-message-delivery" element={<MainLayout><PersonalizedVideoMessages page={"SMD"} /></MainLayout>} />
          <Route path="/secure-message-locking" element={<MainLayout><PersonalizedVideoMessages page={"SML"} /></MainLayout>} />


          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/profile" element={<MainLayout>\<Dashboard path={"profile"} /></MainLayout>} />
          <Route path="/my-memories" element={<MainLayout>\<Dashboard path={"my-memories"} /></MainLayout>} />
          <Route path="/create-memory" element={<MainLayout>\<Dashboard path={"create-memory"} /></MainLayout>} />

        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
