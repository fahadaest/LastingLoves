import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import store from './redux/store';
import Header from './components/Header';
// import { ProtectedRoute } from './routes';

import Home from './pages/Home';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Header/>
        <Routes>
          
          <Route path="/" element={<Home />} />

          {/* Protected Routes (requires authentication) */}
          {/* <ProtectedRoute path="/profile" element={<UserProfile />} /> */}
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
