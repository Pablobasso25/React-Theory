import { Container, Row, Col, Alert } from "react-bootstrap";

// 📥 IMPORTACIÓN DE COMPONENTES HIJOS
import TarjetaPresentacion from "./components/props/TarejetaPresentacion";
import ListaHabilidades from "./components/props/ListaHabilidades";

// 🎯 COMPONENTE PADRE PRINCIPAL
function App() {
  // 📊 DATOS QUE EL PADRE QUIERE COMPARTIR CON LOS HIJOS
  // Estos datos PODRÍAN venir de una API, usuario, etc.

  return (
    // 🎨 CONTAINER PRINCIPAL DE BOOTSTRAP
    <Container className="py-4">
      {/* ℹ️ ALERTA DE BIENVENIDA */}
      <Alert variant="primary" className="text-center">
        <h1>🚀 Mi Portfolio con React + Bootstrap</h1>
        <p className="mb-0">Aprendiendo React paso a paso</p>
      </Alert>

      {/* 📐 SISTEMA DE GRID - Row con 2 Columnas */}
      <Row>
        {/* 📦 COLUMNA IZQUIERDA */}
        <Col lg={6}>
          {/* 🎴 COMPONENTE TARJETA PRESENTACIÓN */}
          {/* 🔗 PASANDO PROPS AL HIJO */}
          <TarjetaPresentacion
            nombre="Pablo Baaso" // ← Prop string
            ocupacion="Estudiante de Programación" // ← Prop string
            descripcion="Apasionado por el desarrollo web y React. Actualmente aprendiendo los fundamentos de React y construyendo mis primeras aplicaciones."
            nivel="avanzado" // ← Prop string
          />

          {/* 📋 COMPONENTE LISTA HABILIDADES */}
          <ListaHabilidades
            titulo="💻 Mis Habilidades Técnicas" // ← Prop string
            habilidades={[
              // ← Prop array
              "HTML5",
              "CSS3",
              "JavaScript",
              "React",
              "Git",
              "Responsive Design",
            ]}
            tipo="tecnica" // ← Prop string
          />
        </Col>

        {/* 📦 COLUMNA DERECHA */}
        <Col lg={6}>
          {/* 📋 SEGUNDA LISTA HABILIDADES - REUTILIZACIÓN */}
          <ListaHabilidades
            titulo="🌟 Mis Habilidades Blandas" // ← Diferente título
            habilidades={[
              // ← Diferente array
              "Trabajo en equipo",
              "Resolución de problemas",
              "Comunicación efectiva",
              "Aprendizaje continuo",
            ]}
            tipo="blanda" // ← Diferente tipo
          />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
