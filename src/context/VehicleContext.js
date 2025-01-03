import React, { createContext, useState, useEffect, useContext } from 'react';

const VehicleContext = createContext();
const OrderContext = createContext(); // Menambahkan OrderContext

export const useVehicle = () => useContext(VehicleContext);
export const useOrder = () => useContext(OrderContext); // Hook untuk OrderContext

export const VehicleOrderProvider = ({ children }) => {
  // Daftar kendaraan yang tersedia dan status ketersediaannya
  const [availableVehicles, setAvailableVehicles] = useState([
    { id: 1, type: 'Mobil', model: 'Toyota Avanza', availability: 5 },
    { id: 2, type: 'Motor', model: 'Honda Vario', availability: 3 },
    { id: 3, type: 'Mobil', model: 'Honda Brio', availability: 4 },
    { id: 4, type: 'Motor', model: 'Yamaha MX King', availability: 2 },
    { id: 5, type: 'Mobil', model: 'Toyota Innova', availability: 6 },
    { id: 6, type: 'Motor', model: 'Honda Beat', availability: 7 },
  ]);

  const [vehicle, setVehicle] = useState(() => {
    const storedVehicle = localStorage.getItem('vehicle');
    return storedVehicle ? JSON.parse(storedVehicle) : null;
  });

  const [orderCount, setOrderCount] = useState(0); // State untuk orderCount

  useEffect(() => {
    if (vehicle) {
      localStorage.setItem('vehicle', JSON.stringify(vehicle));
    } else {
      localStorage.removeItem('vehicle');
    }
  }, [vehicle]);

  const clearVehicle = () => {
    setVehicle(null);
    localStorage.removeItem('vehicle');
  };

  const updateVehicleAvailability = (vehicleId) => {
    setAvailableVehicles((prevVehicles) =>
      prevVehicles.map((v) =>
        v.id === vehicleId && v.availability > 0
          ? { ...v, availability: v.availability - 1 }
          : v
      )
    );
  };

  const updateOrderCount = (newCount) => {
    setOrderCount(newCount);
  };

  return (
    <VehicleContext.Provider value={{ availableVehicles, setAvailableVehicles, vehicle, setVehicle, clearVehicle, updateVehicleAvailability }}>
      <OrderContext.Provider value={{ orderCount, updateOrderCount }}>
        {children}
      </OrderContext.Provider>
    </VehicleContext.Provider>
  );
};
