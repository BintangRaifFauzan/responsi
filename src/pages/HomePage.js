import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useVehicle } from '../context/VehicleContext';

const HomePage = () => {
  const { availableVehicles, setVehicle, updateVehicleAvailability } = useVehicle();
  const navigate = useNavigate();
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  // Fungsi untuk memilih kendaraan
  const handleVehicleSelect = (id) => {
    const vehicle = availableVehicles.find((v) => v.id === id);
    setSelectedVehicle(vehicle);
  };

  // Fungsi untuk memulai pemesanan
  const handleStartOrder = () => {
    if (selectedVehicle) {
      if (selectedVehicle.availability > 0) {
        // Memperbarui ketersediaan kendaraan
        updateVehicleAvailability(selectedVehicle.id);

        // Menyimpan kendaraan yang dipilih ke context dan localStorage
        setVehicle(selectedVehicle);
        localStorage.setItem('vehicle', JSON.stringify(selectedVehicle)); // Menyimpan ke localStorage

        navigate('/booking'); // Mengarahkan ke halaman pemesanan
      } else {
        alert('Kendaraan yang Anda pilih sudah tidak tersedia.');
      }
    } else {
      alert('Silakan pilih kendaraan terlebih dahulu.');
    }
  };

  // Menyaring kendaraan berdasarkan kategori (mobil atau motor)
  const filterVehiclesByType = (type) => {
    return availableVehicles.filter(vehicle => vehicle.type === type);
  };

  // Fungsi untuk mendapatkan path gambar kendaraan berdasarkan model
  const getVehicleImage = (model) => {
    const imageMap = {
      'Toyota Innova': '/images/Innova.jpg',
      'Toyota Avanza': '/images/ToyotaAvanza.jpg',
      'Honda Brio': '/images/HondaBrio.jpg',
      'Yamaha MX King': '/images/MX.jpg',
      'Honda Beat': '/images/Beat.jpg',
      'Honda Vario': '/images/Vario150.jpg',
    };

    // Mengembalikan gambar berdasarkan model, atau gambar default jika tidak ada
    return imageMap[model] || '/images/default.jpg';
  };

  return (
    <div
      className="min-h-screen bg-gray-50 bg-cover bg-center"
      style={{ backgroundImage: "url('/images/dashboard.jpg')" }}
    >
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl font-bold text-white mb-6">Layanan Antar Kendaraan Online</h1>
        <p className="text-xl text-black mb-7">Pesan kendaraan sesuai keinginan Anda. Gambar blur berarti anda sudah memilih kendaraan</p>
        {/* Kategori Mobil */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-white mb-4">Mobil</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filterVehiclesByType('Mobil').map((vehicle) => (
              <div
                key={vehicle.id}
                className={`relative p-4 border rounded-lg cursor-pointer transition duration-300 transform hover:scale-105 active:scale-95 overflow-hidden ${selectedVehicle?.id === vehicle.id ? 'border-blue-600 bg-blue-50' : 'border-gray-300'}`}
                onClick={() => handleVehicleSelect(vehicle.id)}
                style={{ height: '200px' }}
              >
                {/* Gambar Kendaraan */}
                <div
                  className={`absolute inset-0 bg-cover bg-center transition duration-300 ${selectedVehicle?.id === vehicle.id ? 'blur-sm' : ''}`}
                  style={{ backgroundImage: `url(${getVehicleImage(vehicle.model)})` }}
                ></div>

                {/* Overlay untuk Informasi */}
                <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center z-10 text-white">
                  <h3 className="text-xl font-semibold">{vehicle.model}</h3>
                  <p>{vehicle.color}</p>
                  <p>{`Ketersediaan: ${vehicle.availability} unit`}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Kategori Motor */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-white mb-4">Motor</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filterVehiclesByType('Motor').map((vehicle) => (
              <div
                key={vehicle.id}
                className={`relative p-4 border rounded-lg cursor-pointer transition duration-300 transform hover:scale-105 active:scale-95 overflow-hidden ${selectedVehicle?.id === vehicle.id ? 'border-blue-600 bg-blue-50' : 'border-gray-300'}`}
                onClick={() => handleVehicleSelect(vehicle.id)}
                style={{ height: '200px' }}
              >
                {/* Gambar Kendaraan */}
                <div
                  className={`absolute inset-0 bg-cover bg-center transition duration-300 ${selectedVehicle?.id === vehicle.id ? 'blur-sm' : ''}`}
                  style={{ backgroundImage: `url(${getVehicleImage(vehicle.model)})` }}
                ></div>

                {/* Overlay untuk Informasi */}
                <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center z-10 text-white">
                  <h3 className="text-xl font-semibold">{vehicle.model}</h3>
                  <p>{vehicle.color}</p>
                  <p>{`Ketersediaan: ${vehicle.availability} unit`}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tombol untuk memulai pemesanan */}
        <button
          onClick={handleStartOrder}
          className="bg-blue-600 text-white py-2 px-4 rounded-full text-lg hover:bg-blue-700 transition duration-200"
        >
          Mulai Pemesanan
        </button>
      </div>
    </div>
  );
};

export default HomePage;
