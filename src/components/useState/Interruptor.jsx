// src/components/Interruptor.jsx
import React, { useState } from "react";
import { Card, Button, Badge } from "react-bootstrap";

function Interruptor() {
  // 🎯 1. DECLARAR ESTADO BOOLEANO - valor inicial false (apagado)
  const [encendido, setEncendido] = useState(false);

  // 🎯 2. FUNCIÓN PARA ALTERNAR (toggle)
  const alternar = () => {
    setEncendido(!encendido); // ⚡ Cambia true→false o false→true
  };

  return (
    <Card className="text-center shadow-sm">
      <Card.Header>
        <h5 className="mb-0">💡 Interruptor</h5>
      </Card.Header>

      <Card.Body>
        {/* 🎨 ESTADO VISUAL SEGÚN EL ESTADO BOOLEANO */}
        <div
          className={`p-4 mb-3 rounded ${encendido ? "bg-warning" : "bg-dark"}`}
        >
          <Badge bg={encendido ? "dark" : "light"} className="fs-4">
            {encendido ? "💡 ENCENDIDO" : "⚫ APAGADO"}
          </Badge>
        </div>

        {/* 🎯 BOTÓN QUE CAMBIA EL ESTADO */}
        <Button
          variant={encendido ? "outline-dark" : "outline-warning"}
          onClick={alternar}
          className="w-100"
        >
          {encendido ? "🔌 Apagar" : "🔋 Encender"}
        </Button>
      </Card.Body>
    </Card>
  );
}

export default Interruptor;
