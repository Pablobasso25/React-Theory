import { Container, Row, Col, Alert } from "react-bootstrap";
import Contador from "../src/components/useState/Contador";
import Interruptor from "../src/components/useState/Interruptor";
import FormularioContacto from "../src/components/useState/FormularioContacto";
import DemoEventos from "./components/eventos/DemoEventos";

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
        </Col>
      </Row>
    </Container>
  );
}

export default App2;
