import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Loading from './components/Loading';
import Presentacion from './pages/presentacion';
import Discover from './pages/discover';
import Join from './pages/join';
import MainLayout from './layouts/MainLayout';
import Header from './components/Header';
import Construction from './pages/construction';
import Submit from "./pages/submit";

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
        <Router>
          <div className="App">
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <Header />
                    <Presentacion />
                  </>
                }
              />
              <Route element={<MainLayout />}>
                <Route path="/discover" element={<Discover />} />
                <Route path="/join" element={<Join />} />
                <Route path="/construction" element={<Construction/>} />
                <Route path="/submit" element={<Submit/>} />
              </Route>

            </Routes>
          </div>
        </Router>
      )}
    </>
  );
}

export default App;

