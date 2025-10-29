import "./App.css";
import { MiSaludo } from "./components/MiSaludo";
import Contador from "./components/Contador";
import ListaUsuarios from "./components/usuarios/ListaUsuarios";
import FormularioUsuario from "./components/formulario-usuarios/FormularioUsuario";
function App() {
  return (
    <div className="container">
      <MiSaludo />
      <Contador />
      <ListaUsuarios />
      <FormularioUsuario />
    </div>
  );
}

export default App;
