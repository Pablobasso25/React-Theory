// src/components/TarjetaPresentacion.jsx
import React from "react";
import { Card, Badge } from "react-bootstrap";

// 🎯 DEFINICIÓN DEL COMPONENTE HIJO
// Este componente RECIBE datos del padre via PROPS
function TarjetaPresentacion({
  nombre, // ← Prop string
  ocupacion, // ← Prop string
  descripcion, // ← Prop string
  nivel = "principiante", // ← Prop con valor por defecto
}) {
  // 🎨 LÓGICA INTERNA DEL COMPONENTE
  // Determina el color del badge según el nivel
  const obtenerColorBadge = () => {
    if (nivel === "avanzado") return "success";
    if (nivel === "intermedio") return "warning";
    return "primary"; // principiante por defecto
  };

  return (
    // 🎨 COMPONENTE BOOTSTRAP - Card
    <Card className="mb-3 shadow-sm">
      <Card.Body>
        {/* 📐 LAYOUT FLEX PARA ALINEAR TÍTULO Y BADGE */}
        <div className="d-flex justify-content-between align-items-start">
          {/* 📝 INFORMACIÓN PRINCIPAL */}
          <div>
            {/* 🏷️ Título con el nombre (prop) */}
            <Card.Title>{nombre}</Card.Title>
            {/* 🏷️ Subtítulo con ocupación (prop) */}
            <Card.Subtitle className="mb-2 text-muted">
              {ocupacion}
            </Card.Subtitle>
          </div>

          {/* 🎫 Badge dinámico según nivel (prop) */}
          <Badge bg={obtenerColorBadge()}>{nivel}</Badge>
        </div>

        {/* 📄 Descripción (prop) */}
        <Card.Text>{descripcion}</Card.Text>
      </Card.Body>
    </Card>
  );
}

// 🚀 EXPORTACIÓN para que otros componentes puedan importarlo
export default TarjetaPresentacion;
