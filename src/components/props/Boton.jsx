// src/components/Boton.jsx
import React from "react";
import { Button } from "react-bootstrap";

function Boton({
  texto,
  variante = "primary",
  tamaño = "md",
  deshabilitado = false,
  onClick,
}) {
  return (
    <Button
      variant={variante}
      size={tamaño}
      disabled={deshabilitado}
      onClick={onClick}
      className="me-2 mb-2"
    >
      {texto}
    </Button>
  );
}

export default Boton;
