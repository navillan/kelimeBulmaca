import { collection, getDocs } from "firebase/firestore";
import { useState, useEffect } from 'react';
import { db } from '../index.js';

const useGetKelime = () => {

  const [kelimeler, setKelimeler] = useState([]);
  const [mainKelime, setMainKelime] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  
  
  

  async function getKelimeler() {
    
    setLoading(true);
    
    try {
    const response = await getDocs(collection(db, "harfler"));
    const kelimelerArray = response.docs.map(doc => ({
        ...doc.data()
      }));
      const kelime = kelimelerArray.length > 0 
    ? kelimelerArray[Math.floor(Math.random() * (kelimelerArray.length))]
    : "";
  console.log("Kelimeler:", kelime);
  
    const mainKelime = kelime != {} 
    ? Object.values(kelime)[Math.floor(Math.random() * (Object.entries(kelime).length))]
    : "";
    setMainKelime(mainKelime);
    setKelimeler(kelime);
        } catch (err) {
          setError(err);
        } finally {
          setLoading(false);
        }
      }
      
      useEffect(() => {
        getKelimeler();
      }, []);
    
      return { mainKelime, kelimeler, error, loading, getKelimeler };
};

export default useGetKelime;