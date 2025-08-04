import { collection, getDocs } from "firebase/firestore";
import { useState, useEffect } from 'react';
import { db } from '../index.js';

const useRandomKelime = () => {

  const [kelimeler, setKelimeler] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  async function getKelimeler() {
    setLoading(true);
    
    try {
    const response = await getDocs(collection(db, "harfler"));
    const kelimelerArray = response.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

    setKelimeler(kelimelerArray);
        } catch (err) {
          setError(err);
        } finally {
          setLoading(false);
        }
      }
      
      useEffect(() => {
        getKelimeler();
      }, []);
    setTimeout(() => {
      console.log(kelimeler);
    } , 3000);
      return { kelimeler, error, loading, getKelimeler };
};

export default useRandomKelime;