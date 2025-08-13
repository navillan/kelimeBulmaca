import useGetKelime from "../hooks/useGetKelime.js";


const useRandomKelime = async () => {
  
  const { kelimeler } = useGetKelime();
  
  const kelime = kelimeler.length > 0 
  ? kelimeler[Math.floor(Math.random() * (kelimeler.length))]
  : "";
  console.log("KelimelerRandom:", kelime);

  const mainKelime = kelime != {} 
  ? Object.entries(kelime)[Math.floor(Math.random() * (Object.entries(kelime).length))]
  : "";

  return { mainKelime, kelimeler };
}

export default useRandomKelime;