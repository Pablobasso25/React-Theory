import { Container, Row, Col, Alert } from "react-bootstrap";
import Contador from "../src/components/useState/Contador";
import Interruptor from "../src/components/useState/Interruptor";
import FormularioContacto from "../src/components/useState/FormularioContacto";

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
            <Col md={6} className="mb-3">
              <Contador />
            </Col>
            <Col md={6} className="mb-3">
              <Interruptor />
            </Col>
          </Row>

          <FormularioContacto />
        </Col>
      </Row>
    </Container>
  );
}

export default App2;
