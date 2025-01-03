import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { VehicleOrderProvider } from './context/VehicleContext'; // Import VehicleOrderProvider

import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import BookingPage from './pages/BookingPage';
import OrderHistory from './pages/OrderHistory';

const App = () => {
  return (
    <VehicleOrderProvider> {/* Membungkus seluruh aplikasi dengan provider */}
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/booking" element={<BookingPage />} />
          <Route path="/order-history" element={<OrderHistory />} />
        </Routes>
        <Footer />
      </Router>
    </VehicleOrderProvider>
  );
};

export default App;
