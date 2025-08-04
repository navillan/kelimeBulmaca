import useRandomKelime from "../hooks/useGetKelime.js";


const KelimeTablosu = () => {

const { kelimeler } = useRandomKelime();

  return (
    <div className="kelime-tablosu">
      <h2>Kelime Tablosu Component</h2>
      <p>This is where the word table functionality will be implemented.</p>
    </div>
  );
}

export default KelimeTablosu;