// src/components/Contador.jsx
import React, { useState } from "react";
import { Card, Button, Badge } from "react-bootstrap";

function Contador() {
  // 🎯 1. DECLARAR ESTADO - número con valor inicial 0
  const [contador, setContador] = useState(0);

  // 🎯 2. FUNCIONES PARA ACTUALIZAR EL ESTADO
  const incrementar = () => {
    setContador(contador + 1); // ⚡ Actualiza y re-renderiza
  };

  const decrementar = () => {
    setContador(contador - 1);
  };

  const resetear = () => {
    setContador(0);
  };

  // 🎨 3. LÓGICA PARA COLOR SEGÚN EL VALOR
  const obtenerColor = () => {
    if (contador > 0) return "success"; // Verde para positivos
    if (contador < 0) return "danger"; // Rojo para negativos
    return "secondary"; // Gris para cero
  };

  return (
    <Card className="text-center shadow-sm">
      <Card.Header>
        <h5 className="mb-0">🧮 Contador Interactivo</h5>
      </Card.Header>

      <Card.Body>
        {/* 📊 MOSTRAR EL VALOR DEL ESTADO */}
        <Badge bg={obtenerColor()} className="fs-1 p-3 mb-3">
          {contador}
        </Badge>

        {/* 🎯 BOTONES QUE ACTUALIZAN EL ESTADO */}
        <div className="d-grid gap-2 d-md-block">
          <Button
            variant="outline-danger"
            onClick={decrementar}
            className="me-2"
          >
            -1
          </Button>

          <Button
            variant="outline-secondary"
            onClick={resetear}
            className="me-2"
          >
            Reset
          </Button>

          <Button variant="outline-success" onClick={incrementar}>
            +1
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default Contador;
