import { collection, getDocs } from "firebase/firestore";
import { useState, useEffect } from 'react';
import { db } from '../index.js';

const useRandomKelime = () => {

  const [kelimeler, setKelimeler] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const kelime = kelimeler.length > 0 
    ? kelimeler[Math.floor(Math.random() * (kelimeler.length))]
    : "";
  console.log("Kelimeler:", kelime);
  
  const mainKelime = Object.values(kelime).map(val =>
      typeof val === "string" ? val.toUpperCase() : val
    );

  async function getKelimeler() {
    setLoading(true);
    
    try {
    const response = await getDocs(collection(db, "harfler"));
    const kelimelerArray = response.docs.map(doc => ({
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
    
      return { mainKelime, kelimeler, error, loading, getKelimeler };
};

export default useRandomKelime;