import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App.js';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "kelimebulmaca-75e54.firebaseapp.com",
  projectId: "kelimebulmaca-75e54",
  storageBucket: "kelimebulmaca-75e54.firebasestorage.app",
  messagingSenderId: "575321615879",
  appId: "1:575321615879:web:09c74df3d2c790925fc4a2",
  measurementId: "G-NWBQ8Y30K5"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
const analytics = getAnalytics(app);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);