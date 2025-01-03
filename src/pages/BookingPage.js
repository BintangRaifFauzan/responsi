import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import cityPrices from "../priceRates.json"; // Mengimpor data tarif dari file JSON

const BookingPage = () => {
  const [destination, setDestination] = useState('');
  const [shippingMethod, setShippingMethod] = useState('regular');
  const [deliveryCost, setDeliveryCost] = useState(0);
  const [currentDateTime, setCurrentDateTime] = useState(''); // Menyimpan tanggal dan waktu saat ini
  const [selectedDate, setSelectedDate] = useState(''); // Menyimpan tanggal yang dipilih oleh pengguna
  const [selectedTime, setSelectedTime] = useState(''); // Menyimpan waktu yang dipilih oleh pengguna
  const navigate = useNavigate();

  // Mengambil kendaraan yang dipilih dari localStorage
  const selectedVehicle = JSON.parse(localStorage.getItem('vehicle'));

  // Mengatur format tanggal dan waktu
  const getFormattedDateTime = () => {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `${day}-${month}-${year} ${hours}:${minutes}`;
  };

  // Memperbarui tanggal dan waktu setiap detik
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDateTime(getFormattedDateTime());
    }, 1000); // Memperbarui setiap detik

    return () => clearInterval(intervalId); // Bersihkan interval saat komponen dibersihkan
  }, []);

  // Menghitung biaya pengiriman berdasarkan kota dan metode pengiriman
  useEffect(() => {
    if (destination) {
      const basePrice = cityPrices[destination]?.motor || 0; // Menggunakan harga motor sebagai default
      const shippingFee = shippingMethod === 'express' ? 250000 : 100000;
      setDeliveryCost(basePrice + shippingFee);
    }
  }, [destination, shippingMethod]);

  // Menambahkan pemesanan ke Firestore
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Membuat objek tanggal dan waktu yang dipilih oleh pengguna
      const selectedDateTime = `${selectedDate} ${selectedTime}`;
      const currentDateTime = new Date().toISOString(); // Tanggal pemesanan saat ini
  
      await addDoc(collection(db, "orders"), {
        vehicleModel: selectedVehicle?.model,
        vehicleType: selectedVehicle?.type,
        destination,
        shippingMethod,
        deliveryCost,
        status: "pending",
        orderDateTime: currentDateTime, // Menambahkan tanggal dan waktu pemesanan
        selectedDateTime, // Menambahkan tanggal dan waktu yang dipilih oleh pengguna
      });
      
      // Setelah data berhasil disimpan, arahkan ke halaman Order History
      navigate("/order-history");
    } catch (error) {
      console.error("Error adding order: ", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-16 px-6 md:px-16">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">Form Pemesanan Kendaraan</h1>

        {/* Menampilkan Tanggal dan Waktu */}
        <div className="mb-6">
          <p className="text-lg font-semibold text-gray-800">Tanggal dan Waktu Pemesanan: {currentDateTime}</p>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Kendaraan yang Dipilih</h2>
          <div className="flex items-center space-x-4 bg-gray-50 p-4 rounded-lg shadow-sm">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{selectedVehicle?.model}</h3>
              <p className="text-gray-600">{selectedVehicle?.type}</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="destination" className="block text-gray-700 text-sm font-semibold mb-2">Kota Tujuan</label>
            <select
              id="destination"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Pilih Kota</option>
              {Object.keys(cityPrices).map((city) => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>

          <div className="mb-6">
            <label htmlFor="shippingMethod" className="block text-gray-700 text-sm font-semibold mb-2">Metode Pengiriman</label>
            <select
              id="shippingMethod"
              value={shippingMethod}
              onChange={(e) => setShippingMethod(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="regular">Reguler</option>
              <option value="express">Express</option>
            </select>
          </div>

          {/* Menambahkan Pemilihan Tanggal */}
          <div className="mb-6">
            <label htmlFor="date" className="block text-gray-700 text-sm font-semibold mb-2">Tanggal Pengiriman</label>
            <input
              type="date"
              id="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Menambahkan Pemilihan Waktu */}
          <div className="mb-6">
            <label htmlFor="time" className="block text-gray-700 text-sm font-semibold mb-2">Waktu Pengiriman</label>
            <input
              type="time"
              id="time"
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-6">
            <p className="text-lg font-semibold text-gray-800">Total Biaya Pengiriman</p>
            <div className="flex justify-between items-center bg-blue-100 p-4 rounded-lg">
              <span className="text-gray-600">Rp {deliveryCost.toLocaleString()}</span>
              <span className="text-gray-600 text-sm">{shippingMethod === 'express' ? '(Express)' : '(Reguler)'}</span>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg text-lg hover:bg-blue-700 transition duration-200"
          >
            Pesan Sekarang
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingPage;
