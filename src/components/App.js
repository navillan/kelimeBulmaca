import KelimeTablosu from "./kelimeTablosu.js";
import Klavye from "./klavye.js";
import Skor from "./skor.js";


function App () {
  return (
    <div className="App">
      <Skor />
      <h1>Welcome to My Application</h1>
      <KelimeTablosu />
      <Klavye />
      <p>Bu uygulama kelime bulmaca oyununu içerir.</p>
    </div>
  );
}

export default App;