import "./App.css";
import { MiSaludo } from "./components/MiSaludo";
import Contador from "./components/Contador";
import ListaUsuarios from "./components/usuarios/ListaUsuarios";
function App() {
  return (
    <div className="container">
      <MiSaludo />
      <Contador />
      <ListaUsuarios />
    </div>
  );
}

export default App;
