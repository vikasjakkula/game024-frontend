import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Main from './pages/main.js';
import CoinGame from './pages/CoinGame';
import LoadingScreen from './components/LoadingScreen';
import { PrecisionManufacturing } from '@mui/icons-material';
import { ThemeProvider } from './components/ThemeProvider';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="main" element={<Main />} />
            <Route path="coin-game" element={<CoinGame />} />
            <Route path="Pricing" element={<PrecisionManufacturing />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
