import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import store from './redux/store';
import MainLayout from './layouts/MainLayout';
import ProtectedRoute from './routes/protectedRoute';
import Home from './pages/Home';
import Pricing from './pages/Pricing';
import HowItWorks from './pages/HowItWorks';
import UpgradePlan from './components/personalizedVMSections/UpgradePlan';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import TermsOfService from './pages/TermsOfService';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Dashboard from './pages/Dashboard';
import { useDispatch } from "react-redux";
import { checkAuthStatus } from "./redux/slices/authSlice";
import PublicProfile from './pages/PublicProfile';
import AuthSuccess from './pages/AuthSuccess';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuthStatus());
  }, [dispatch]);

  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<MainLayout><Home url={"home"} /></MainLayout>} />
          <Route path="/about" element={<MainLayout><Home url={"about"} /></MainLayout>} />
          <Route path="/Services" element={<MainLayout><Home url={"services"} /></MainLayout>} />
          <Route path="/Contact" element={<MainLayout><Home url={"contact"} /></MainLayout>} />
          <Route path="/terms-of-service" element={<MainLayout><TermsOfService /></MainLayout>} />
          <Route path="/privacy-policy" element={<MainLayout><PrivacyPolicy /></MainLayout>} />

          <Route path="/Pricing" element={<MainLayout><Pricing /></MainLayout>} />
          <Route path="/how-it-works" element={<MainLayout><HowItWorks /></MainLayout>} />
          <Route path="/monthly-plan" element={<MainLayout><UpgradePlan page={"MON"} /></MainLayout>} />
          <Route path="/annual-plan" element={<MainLayout><UpgradePlan page={"ANN"} /></MainLayout>} />
          <Route path="/auth-success" element={<AuthSuccess />} />

          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />

          <Route path="/profile" element={
            <ProtectedRoute>
              <MainLayout><Dashboard path={"profile"} /></MainLayout>
            </ProtectedRoute>
          } />

          <Route path="/create-memory" element={
            <ProtectedRoute>
              <MainLayout><Dashboard path={"create-memory"} /></MainLayout>
            </ProtectedRoute>
          } />

          <Route path="/public-profile/:userId/:videoId?" element={
            <ProtectedRoute>
              <MainLayout><PublicProfile /></MainLayout>
            </ProtectedRoute>
          } />

        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
