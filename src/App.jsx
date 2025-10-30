import { Container, Row, Col, Alert } from "react-bootstrap";

// 📥 IMPORTACIÓN DE COMPONENTES HIJOS
import TarjetaPresentacion from "./components/props/TarejetaPresentacion";
import ListaHabilidades from "./components/props/ListaHabilidades";
import Proyecto from "./components/props/Proyecto";

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
        {/* 📦 COLUMNA IZQUIERDA INFORMACIÓN PERSONAL */}
        <Col lg={5}>
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
        {/* 📦 COLUMNA DERECHA - PROYECTOS */}
        <Col lg={7}>
          <h3 className="mb-4">📂 Mis Proyectos</h3>

          <Row>
            {/* 🎴 PROYECTO 1 - CRUD DE USUARIOS */}
            <Col md={6} className="mb-3">
              <Proyecto
                titulo="Sistema CRUD de Usuarios"
                descripcion="Una aplicación completa para gestionar usuarios con operaciones Create, Read, Update y Delete. Desarrollada con React y Bootstrap."
                tecnologias={[
                  "React",
                  "Bootstrap",
                  "JavaScript",
                  "LocalStorage",
                ]}
                enlace="https://github.com/pablo/mi-crud-usuarios"
                estado="en desarrollo"
              />
            </Col>

            {/* 🎴 PROYECTO 2 - PORTFOLIO PERSONAL */}
            <Col md={6} className="mb-3">
              <Proyecto
                titulo="Portfolio Personal"
                descripcion="Sitio web personal para mostrar mis proyectos y habilidades como desarrollador. Diseño responsive y moderno."
                tecnologias={[
                  "React",
                  "CSS3",
                  "JavaScript",
                  "Responsive Design",
                ]}
                enlace="https://pablo-dev-portfolio.netlify.app"
                estado="completado"
              />
            </Col>

            {/* 🎴 PROYECTO 3 - LISTA DE TAREAS */}
            <Col md={6} className="mb-3">
              <Proyecto
                titulo="Aplicación de Tareas"
                descripcion="Gestor de tareas personal con funcionalidades de agregar, eliminar y marcar como completadas."
                tecnologias={["React", "useState", "CSS3"]}
                enlace="https://github.com/pablo/lista-tareas"
                estado="en desarrollo"
              />
            </Col>

            {/* 🎴 PROYECTO 4 - CLIMA APP */}
            <Col md={6} className="mb-3">
              <Proyecto
                titulo="Aplicación del Clima"
                descripcion="Aplicación que muestra el clima actual utilizando una API externa. Primer proyecto con consumo de APIs."
                tecnologias={["React", "API Fetch", "CSS3"]}
                enlace="#"
                estado="planeado"
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
