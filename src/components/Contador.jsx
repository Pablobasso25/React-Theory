// Importamos React y el hook useState
import React, { useState } from "react";

// Importamos componentes de React Bootstrap
import { Card, Button } from "react-bootstrap";

// Definimos el componente funcional llamado "Contador"
function Contador() {
  // Creamos una variable de estado llamada "valor"
  // useState(0) inicializa el estado en 0
  const [valor, setValor] = useState(0);

  // Función que se ejecuta al hacer clic en el botón
  const aumentar = () => {
    setValor(valor + 1); // Actualiza el estado sumando 1
  };

  // Renderizamos el componente
  return (
    <Card className="text-center mt-4 shadow-sm">
      <Card.Body>
        <Card.Title>🧮 Contador React</Card.Title>
        <Card.Text>
          Valor actual: <strong>{valor}</strong>
        </Card.Text>
        <Button variant="primary" onClick={aumentar}>
          Sumar 1
        </Button>
      </Card.Body>
    </Card>
  );
}

// Exportamos el componente
export default Contador;
