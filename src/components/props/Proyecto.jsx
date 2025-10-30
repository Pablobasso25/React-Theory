import { Card, Button, Badge, Stack } from "react-bootstrap";

// 🎯 DEFINICIÓN DEL COMPONENTE HIJO
function Proyecto({
  titulo, // ← string: Título del proyecto
  descripcion, // ← string: Descripción del proyecto
  tecnologias, // ← array: Lista de tecnologías usadas
  enlace, // ← string: URL del proyecto o repositorio
  estado = "en desarrollo", // ← string: Estado del proyecto (valor por defecto)
}) {
  // 🎨 LÓGICA INTERNA DEL COMPONENTE

  // 1. Función para determinar color del badge según estado
  const obtenerColorEstado = () => {
    switch (estado) {
      case "completado":
        return "success"; // Verde
      case "en desarrollo":
        return "warning"; // Amarillo
      case "planeado":
        return "secondary"; // Gris
      default:
        return "primary"; // Azul
    }
  };

  // 2. Función para obtener ícono según estado
  const obtenerIconoEstado = () => {
    switch (estado) {
      case "completado":
        return "✅";
      case "en desarrollo":
        return "🛠️";
      case "planeado":
        return "📋";
      default:
        return "🔍";
    }
  };

  return (
    // 🎨 COMPONENTE BOOTSTRAP - Card
    <Card className="mb-4 shadow-sm h-100">
      {/* 🎫 HEADER CON TÍTULO Y ESTADO */}
      <Card.Header className="bg-light">
        <div className="d-flex justify-content-between align-items-center">
          {/* 📝 Título del proyecto */}
          <Card.Title className="mb-0 h5">{titulo}</Card.Title>

          {/* 🏷️ Badge de estado */}
          <Badge
            bg={obtenerColorEstado()}
            className="d-flex align-items-center"
          >
            <span className="me-1">{obtenerIconoEstado()}</span>
            {estado}
          </Badge>
        </div>
      </Card.Header>

      <Card.Body className="d-flex flex-column">
        {/* 📄 Descripción del proyecto */}
        <Card.Text className="flex-grow-1">{descripcion}</Card.Text>

        {/* 🔧 Tecnologías usadas */}
        <div className="mb-3">
          <h6 className="text-muted mb-2">🛠️ Tecnologías utilizadas:</h6>

          {/* 📋 Stack de badges para tecnologías */}
          <Stack direction="horizontal" gap={2} className="flex-wrap">
            {tecnologias.map((tecnologia, index) => (
              <Badge
                key={index}
                bg="outline-primary"
                text="dark"
                className="border"
                style={{ fontSize: "0.75rem" }}
              >
                {tecnologia}
              </Badge>
            ))}
          </Stack>
        </div>

        {/* 🔗 Botón de enlace */}
        <div className="mt-auto">
          <Button
            variant="outline-primary"
            href={enlace}
            target="_blank"
            rel="noopener noreferrer"
            className="w-100"
          >
            🌐 Ver Proyecto
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default Proyecto;
