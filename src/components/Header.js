import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useOrder } from '../context/VehicleContext'; // Ubah ke useOrder

const Header = () => {
  const { orderCount } = useOrder(); // Mengambil orderCount dari context
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-500 shadow-md p-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link to="/" className="text-white text-2xl font-bold">
            CV. Vehicle
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 text-white font-medium">
          <Link to="/" className="hover:text-blue-200 transition duration-300">
            Home
          </Link>
          <Link to="/booking" className="hover:text-blue-200 transition duration-300">
            Booking
          </Link>
          <Link to="/order-history" className="flex items-center hover:text-blue-200 transition duration-300">
            Order History
            {orderCount > 0 && (
              <span className="ml-2 bg-red-600 text-white px-2 py-1 rounded-full text-sm">
                {orderCount}
              </span>
            )}
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMobileMenu}
          className="md:hidden text-white text-2xl focus:outline-none"
        >
          {isMobileMenuOpen ? (
            <span className="material-icons">close</span> // Icon close (ganti dengan ikon yang sesuai)
          ) : (
            <span className="material-icons">menu</span> // Icon menu (ganti dengan ikon yang sesuai)
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden flex flex-col items-center mt-4 space-y-4 text-white font-medium">
          <Link to="/" className="hover:text-blue-200 transition duration-300">
            Home
          </Link>
          <Link to="/booking" className="hover:text-blue-200 transition duration-300">
            Booking
          </Link>
          <Link to="/order-history" className="flex items-center hover:text-blue-200 transition duration-300">
            Order History
            {orderCount > 0 && (
              <span className="ml-2 bg-red-600 text-white px-2 py-1 rounded-full text-sm">
                {orderCount}
              </span>
            )}
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Header;
