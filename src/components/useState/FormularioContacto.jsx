// src/components/FormularioContacto.jsx
import React, { useState } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";

function FormularioContacto() {
  // 🎯 1. ESTADO COMO OBJETO - para múltiples campos
  const [formulario, setFormulario] = useState({
    nombre: "",
    email: "",
    mensaje: "",
  });

  // 🎯 2. ESTADO PARA CONTROLAR LA ALERTA
  const [mostrarAlerta, setMostrarAlerta] = useState(false);

  // 🎯 3. MANEJAR CAMBIOS EN LOS INPUTS
  const manejarCambio = (e) => {
    const { name, value } = e.target;

    // ⚡ ACTUALIZAR SOLO LA PROPIEDAD QUE CAMBIÓ
    setFormulario({
      ...formulario, // 📝 Copiar todas las propiedades existentes
      [name]: value, // ✏️ Actualizar solo la propiedad que cambió
    });
  };

  // 🎯 4. MANEJAR ENVÍO DEL FORMULARIO
  const manejarEnvio = (e) => {
    e.preventDefault(); // 🚫 Prevenir envío normal del formulario

    console.log("📤 Datos enviados:", formulario);
    setMostrarAlerta(true);

    // ⏰ Ocultar alerta después de 3 segundos
    setTimeout(() => setMostrarAlerta(false), 3000);
  };

  return (
    <Card className="shadow-sm">
      <Card.Header>
        <h5 className="mb-0">📧 Formulario de Contacto</h5>
      </Card.Header>

      <Card.Body>
        {/* ✅ ALERTA DE ÉXITO */}
        {mostrarAlerta && (
          <Alert variant="success" className="mb-3">
            ✅ ¡Formulario enviado correctamente!
          </Alert>
        )}

        <Form onSubmit={manejarEnvio}>
          {/* 📝 CAMPO NOMBRE */}
          <Form.Group className="mb-3">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              name="nombre"
              value={formulario.nombre}
              onChange={manejarCambio}
              placeholder="Tu nombre"
              required
            />
          </Form.Group>

          {/* 📧 CAMPO EMAIL */}
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formulario.email}
              onChange={manejarCambio}
              placeholder="tu@email.com"
              required
            />
          </Form.Group>

          {/* 💬 CAMPO MENSAJE */}
          <Form.Group className="mb-3">
            <Form.Label>Mensaje</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="mensaje"
              value={formulario.mensaje}
              onChange={manejarCambio}
              placeholder="Tu mensaje..."
              required
            />
          </Form.Group>

          {/* 🎯 BOTÓN DE ENVÍO */}
          <Button variant="primary" type="submit" className="w-100">
            Enviar Mensaje
          </Button>
        </Form>

        {/* 👁️ VISTA PREVIA EN TIEMPO REAL */}
        <Card className="mt-3 bg-light">
          <Card.Header>
            <small>👁️ Vista previa en tiempo real:</small>
          </Card.Header>
          <Card.Body>
            <p>
              <strong>Nombre:</strong> {formulario.nombre || "---"}
            </p>
            <p>
              <strong>Email:</strong> {formulario.email || "---"}
            </p>
            <p>
              <strong>Mensaje:</strong> {formulario.mensaje || "---"}
            </p>
          </Card.Body>
        </Card>
      </Card.Body>
    </Card>
  );
}

export default FormularioContacto;
