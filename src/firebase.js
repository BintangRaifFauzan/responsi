import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Konfigurasi Firebase Anda
const firebaseConfig = {
    apiKey: "AIzaSyC8hwIbFSzlRIw-1UxGjURpFmr1wwoCVxg",
    authDomain: "responsi-212fa.firebaseapp.com",
    projectId: "responsi-212fa",
    storageBucket: "responsi-212fa.firebasestorage.app",
    messagingSenderId: "545621701415",
    appId: "1:545621701415:web:6d73ef2bc732975623ef02",
    measurementId: "G-YH6FHCPCNZ"
  };

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);

// Mendapatkan Firestore instance
const db = getFirestore(app);

// Jika tidak menggunakan analytics, hapus baris berikut:
 // const analytics = getAnalytics(app);  // Baris ini dihapus

export { db };
