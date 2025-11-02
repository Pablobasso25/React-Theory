// src/components/InputComplejo.jsx
import React, { useState } from "react";
import { Card, Form, Alert, Badge } from "react-bootstrap";

function InputComplejo() {
  // 🎯 TRES ESTADOS DIFERENTES QUE SE ACTUALIZAN JUNTOS
  const [texto, setTexto] = useState("");
  const [longitud, setLongitud] = useState(0);
  const [esValido, setEsValido] = useState(false);

  // 🎯 EL MANEJADOR COMPLEJO - ACTUALIZA 3 ESTADOS A LA VEZ
  const manejarInputComplejo = (evento) => {
    const valor = evento.target.value; // 1. Obtener texto del input

    // 2. ACTUALIZAR LOS 3 ESTADOS SIMULTÁNEAMENTE
    setTexto(valor); // 💾 Guardar el texto
    setLongitud(valor.length); // 📊 Guardar la longitud
    setEsValido(valor.length > 3); // ✅ Validar (más de 3 caracteres)
  };

  return (
    <Card className="shadow-sm">
      <Card.Header>
        <h5 className="mb-0">🧠 Input con Múltiples Estados</h5>
      </Card.Header>

      <Card.Body>
        {/* 📝 INPUT PRINCIPAL */}
        <Form.Group className="mb-3">
          <Form.Label>Escribe algo:</Form.Label>
          <Form.Control
            type="text"
            value={texto}
            onChange={manejarInputComplejo} // ⚡ Se ejecuta con CADA tecla
            placeholder="Escribe al menos 4 caracteres..."
          />
        </Form.Group>

        {/* 📊 PANEL DE INFORMACIÓN */}
        <div className="mb-3">
          <h6>📈 Información en tiempo real:</h6>

          {/* 🎯 TEXTO ACTUAL */}
          <div className="d-flex justify-content-between mb-2">
            <span>Texto escrito:</span>
            <Badge bg="secondary">{texto || "[vacío]"}</Badge>
          </div>

          {/* 📏 LONGITUD */}
          <div className="d-flex justify-content-between mb-2">
            <span>Longitud:</span>
            <Badge bg={longitud >= 4 ? "primary" : "secondary"}>
              {longitud} caracteres
            </Badge>
          </div>

          {/* ✅ VALIDACIÓN */}
          <div className="d-flex justify-content-between">
            <span>Es válido:</span>
            <Badge bg={esValido ? "success" : "danger"}>
              {esValido ? "✅ VÁLIDO" : "❌ INVÁLIDO"}
            </Badge>
          </div>
        </div>

        {/* 💡 EXPLICACIÓN VISUAL */}
        <Alert variant="info" className="small">
          <strong>💡 ¿Qué está pasando aquí?</strong>
          <br />
          Cada vez que escribes, <code>manejarInputComplejo</code> se ejecuta y:
          <ul className="mb-0 mt-2">
            <li>
              <strong>setTexto(valor)</strong> → Guarda lo que escribiste
            </li>
            <li>
              <strong>setLongitud(valor.length)</strong> → Cuenta los caracteres
            </li>
            <li>
              <strong>setEsValido(valor.length {">"} 3)</strong> → Verifica si
              tiene más de 3 caracteres
            </li>
          </ul>
        </Alert>
      </Card.Body>
    </Card>
  );
}

export default InputComplejo;

/* Busqueda en tiempo real
 const manejarBusqueda = (e) => {
  const termino = e.target.value;
  setTerminoBusqueda(termino);
  setResultados(buscarEnDatos(termino));
  setMostrarResultados(termino.length > 2);
};
*/

/* Validación de contraseña
const manejarPassword = (e) => {
  const password = e.target.value;
  setPassword(password);
  setLongitudPassword(password.length);
  setTieneMayuscula(/[A-Z]/.test(password));
  setTieneNumero(/\d/.test(password));
  setEsPasswordValido(password.length >= 8 && /[A-Z]/.test(password) && /\d/.test(password));
};
*/
