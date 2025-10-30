// src/components/ListaHabilidades.jsx
// src/components/ListaHabilidades.jsx
import React from "react";
import { Card, ListGroup, Badge } from "react-bootstrap";

// 🎯 DEFINICIÓN DEL COMPONENTE HIJO
function ListaHabilidades({
  titulo, // ← Título de la lista
  habilidades, // ← Array de strings
  tipo = "tecnica", // ← Tipo para determinar color
}) {
  // 🎨 LÓGICA INTERNA - Determinar color según tipo
  const obtenerColorHeader = () => {
    // Si es "tecnica" → azul (primary)
    // Si es "blanda" → verde (success)
    return tipo === "tecnica" ? "primary" : "success";
  };

  return (
    // 🎨 COMPONENTE BOOTSTRAP - Card
    <Card className="mb-3">
      {/* 🎫 HEADER CON COLOR DINÁMICO */}
      <Card.Header className={`bg-${obtenerColorHeader()} text-white`}>
        <h5 className="mb-0">{titulo}</h5>
      </Card.Header>

      {/* 📋 LISTA DE HABILIDADES */}
      <ListGroup variant="flush">
        {/* 🔄 MAP PARA TRANSFORMAR ARRAY EN COMPONENTES */}
        {habilidades.map((habilidad, index) => (
          // 🏷️ Cada item de la lista
          <ListGroup.Item
            key={index} // ⚠️ IMPORTANTE: Key única para React
            className="d-flex justify-content-between align-items-center"
          >
            {/* 📝 Nombre de la habilidad */}
            {habilidad}

            {/* 🔢 Número de posición */}
            <Badge bg="secondary">{index + 1}</Badge>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Card>
  );
}

export default ListaHabilidades;
