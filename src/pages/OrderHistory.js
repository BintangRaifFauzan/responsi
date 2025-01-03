import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, query, getDocs, deleteDoc, doc } from 'firebase/firestore';

// Fungsi untuk memformat tanggal
const formatDate = (date) => {
  if (!date) return 'Tanggal tidak tersedia';
  const newDate = date.seconds ? new Date(date.seconds * 1000) : new Date(date); // Memastikan kita menangani timestamp dengan benar
  return newDate.toLocaleDateString('id-ID', {
    weekday: 'long', // Menampilkan hari dalam bahasa Indonesia
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const q = query(collection(db, "orders"));
      const querySnapshot = await getDocs(q);
      const fetchedOrders = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setOrders(fetchedOrders);
    };

    fetchOrders();
  }, []);

  const handleDeleteOrder = async (orderId) => {
    const orderRef = doc(db, "orders", orderId);
    await deleteDoc(orderRef);
    setOrders(orders.filter((order) => order.id !== orderId)); // Menghapus pesanan dari state
  };

  return (
    <div className="min-h-screen bg-gray-100 py-16 px-6 md:px-16">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">Rincian Pemesanan</h1>

        {orders.length === 0 ? (
          <div className="text-center py-10 text-xl text-gray-500">
            <p>Belum ada pemesanan.</p>
          </div>
        ) : (
          <div className="space-y-8">
            {orders.map((order) => (
              <div key={order.id} className="bg-white p-6 rounded-lg shadow-lg">
                <div className="mb-4">
                  <h2 className="text-xl font-semibold text-gray-800">{order.vehicleModel}</h2>
                </div>

                <div className="space-y-2 mb-6">
                  <p className="text-gray-600"><strong>Tujuan Pengiriman:</strong> {order.destination}</p>
                  <p className="text-gray-600"><strong>Metode Pengiriman:</strong> {order.shippingMethod === 'express' ? 'Express' : 'Reguler'}</p>
                  <p className="text-gray-600">
                    <strong>Biaya Pengiriman:</strong> {order.deliveryCost ? `Rp ${order.deliveryCost.toLocaleString()}` : 'Belum dihitung'}
                  </p>
                </div>

                <div className="space-y-2 mb-6">
                  <p className="text-gray-600"><strong>Tanggal Pemesanan:</strong> {formatDate(order.orderDateTime)}</p>
                  <p className="text-gray-600"><strong>Tanggal Pengambilan:</strong> {formatDate(order.selectedDateTime)}</p>
                </div>

                <div className="flex justify-between items-center">
                  <div className="space-x-4">
                    <button
                      onClick={() => handleDeleteOrder(order.id)}
                      className="bg-red-600 text-white py-2 px-4 rounded-lg text-sm hover:bg-red-700 transition duration-200"
                    >
                      Hapus Pesanan
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderHistory;
