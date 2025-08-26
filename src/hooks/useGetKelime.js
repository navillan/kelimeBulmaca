import { collection, getDocs } from "firebase/firestore";
import { useState, useEffect } from 'react';
import { db } from '../index.js';

const useGetKelime = () => {

  const [kelimelerArray, setKelimelerArray] = useState([]);
  const [kelimeler, setKelimeler] = useState([]);
  const [mainKelime, setMainKelime] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  
  
  

  async function getKelimeler() {
    
    setLoading(true);
    
    try {
    const response = await getDocs(collection(db, "harfler"));
    const kelimelerLibrary = response.docs.map(doc => ({
        ...doc.data()
      }));
      const kelime = kelimelerLibrary.length > 0 
    ? kelimelerLibrary[Math.floor(Math.random() * (kelimelerLibrary.length))]
    : "";
  console.log("Harfin Kelimeleri:", kelime);
  console.log("Tüm Kelimeler:", kelimelerLibrary);
  
  
    const mainKelime = kelime != {} 
    ? Object.values(kelime)[Math.floor(Math.random() * (Object.entries(kelime).length))]
    : "";
    setMainKelime(mainKelime);
    setKelimeler(kelime);
    setKelimelerArray(kelimelerLibrary);
        } catch (err) {
          setError(err);
        } finally {
          setLoading(false);
        }
      }
      
      useEffect(() => {
        getKelimeler();
      }, []);
    
      return { mainKelime, kelimeler, kelimelerArray, error, loading, getKelimeler };
};

export default useGetKelime;