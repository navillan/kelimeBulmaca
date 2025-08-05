import KelimeTablosu from "./kelimeTablosu.js";
import Klavye from "./klavye.js";
import Skor from "./skor.js";


function App () {
  return (
    <div className="App">
      <h1>Bu uygulama kelime bulmaca oyununu içerir.</h1>
      <Skor />      
      <KelimeTablosu />
    </div>
  );
}

export default App;