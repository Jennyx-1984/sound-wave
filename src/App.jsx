import Header from './components/Header';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Presentacion from './pages/presentacion.jsx';
import Discover from './pages/discover.jsx';
import Join from './pages/join.jsx';
import Loading from './components/Loading.jsx';
import React, { useState, useEffect } from 'react';

function App() {
const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2500);

    return () => clearTimeout(timer);
  }, []);
  return (
          <>
      {loading ? (
        <Loading />
      ) : (
    <div className='App'>
    <Router>
      <Header/>
      <Routes>
              <Route path="/" element={<Presentacion />} />
              <Route path="/discover" element={<Discover />} />
              <Route path="/join" element={<Join />} />
            </Routes>
          </Router>
        </div>

  )}
  </>
  );
}

export default App;
