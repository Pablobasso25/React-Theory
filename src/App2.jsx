import { Container, Row, Col, Alert } from "react-bootstrap";
import Contador from "../src/components/useState/Contador";
import Interruptor from "../src/components/useState/Interruptor";
import FormularioContacto from "../src/components/useState/FormularioContacto";
import DemoEventos from "./components/eventos/DemoEventos";
import InputComplejo from "./components/multiplesEstados/InputComplejo";
import ValidacionPassword from "./components/validacionContraseña/ValidacionPassword";
import FormularioRegistro from "./components/formularioRegistro/FormularioRegistro";
import PerfilUsuario from "./components/renderizadoCondicional/PerfilUsuario";
import ListaTareas from "./components/renderizadoCondicional/ListaTareas";
import TiendaOnline from "./components/renderizadoCondicional/TiendaOnline";
import SistemaNotificaciones from "./components/renderizadoCondicional/SistemaNotificaciones";
import RelojEnVivo from "./components/useEffect/RelojEnVivo";
import BuscadorUsuarios from "./components/useEffect/BuscadorUsuarios";
import EditorNotas from "./components/useEffect/EditorNotaas";

function App2() {
  return (
    <Container className="py-4">
      <Alert variant="info" className="text-center">
        <h1>🚀 Día 3: useState - Estado en React</h1>
        <p className="mb-0">Aprendiendo estado e interactividad</p>
      </Alert>

      <Row>
        {/* 📦 COLUMNA DERECHA - COMPONENTES INTERACTIVOS */}
        <Col lg={6}>
          <Col md={12} className="mb-3">
            <Contador />
          </Col>
          <Col md={12} className="mb-3">
            <Interruptor />
          </Col>
          <Col md={12} className="mb-3">
            <FormularioContacto />
          </Col>
        </Col>

        <Alert variant="info" className="text-center">
          <h1>🚀 Día 4: Eventos en React</h1>
          <p className="mb-0">
            Aprendiendo a manejar interacciones del usuario
          </p>
        </Alert>
        <Col lg={6}>
          {/* 🎮 NUEVO COMPONENTE DE EVENTOS */}
          <DemoEventos />
          {/* 🎮 NUEVO COMPONENTE DE INPUT COMPLEJO */}
          <InputComplejo />
          {/* 🎮 NUEVO COMPONENTE DE VALIDACIÓN PASSWORD */}
          <ValidacionPassword />
          {/* 🎮 NUEVO COMPONENTE DE FORMULARIO DE REGISTRO*/}
          <FormularioRegistro />
          {/* 🎮 NUEVO COMPONENTE DE RENDERIZADO CONDICIONAL*/}
          <PerfilUsuario />
          <ListaTareas />
        </Col>

        <Alert variant="info" className="text-center">
          <h1>🚀 Ejercicios Prácticos - Día 5</h1>
          <p className="mb-0">Renderizado condicional y listas en acción</p>
        </Alert>
        <Col lg={6}>
          <TiendaOnline />
          <SistemaNotificaciones />
        </Col>
        <Alert variant="info" className="text-center">
          <h1>🚀 Día 6: useEffect - Efectos Secundarios</h1>
          <p className="mb-0">
            Manejando efectos secundarios, APIs, timers y localStorage
          </p>
        </Alert>
        <Col lg={6}>
          <RelojEnVivo />
          <BuscadorUsuarios />
          <EditorNotas />
        </Col>
      </Row>
    </Container>
  );
}

export default App2;
