import { Container, Row, Col, Alert } from "react-bootstrap";
import Contador from "../src/components/useState/Contador";
import Interruptor from "../src/components/useState/Interruptor";
import FormularioContacto from "../src/components/useState/FormularioContacto";
import DemoEventos from "./components/eventos/DemoEventos";
import InputComplejo from "./components/multiplesEstados/InputComplejo";
import ValidacionPassword from "./components/validacionContraseña/ValidacionPassword";
import FormularioRegistro from "./components/formularioRegistro/FormularioRegistro";

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
          <Row>
            <Col md={12} className="mb-3">
              <Contador />
            </Col>
            <Col md={12} className="mb-3">
              <Interruptor />
            </Col>
            <Col md={12} className="mb-3">
              <FormularioContacto />
            </Col>
          </Row>
          {/* 🎮 NUEVO COMPONENTE DE EVENTOS */}
          <DemoEventos />
          {/* 🎮 NUEVO COMPONENTE DE INPUT COMPLEJO */}
          <InputComplejo />
          {/* 🎮 NUEVO COMPONENTE DE VALIDACIÓN PASSWORD */}
          <ValidacionPassword />
          {/* 🎮 NUEVO COMPONENTE DE FORMULARIO DE REGISTRO*/}
          <FormularioRegistro />
        </Col>
      </Row>
    </Container>
  );
}

export default App2;
