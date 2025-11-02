// src/components/DemoEventos.jsx
import React, { useState } from "react";
import { Card, Button, Form, Alert, Badge } from "react-bootstrap";

function DemoEventos() {
  // 🎯 MÚLTIPLES ESTADOS PARA DIFERENTES EVENTOS
  const [contadorClics, setContadorClics] = useState(0);
  const [textoInput, setTextoInput] = useState("");
  const [email, setEmail] = useState("");
  const [estaSobreBoton, setEstaSobreBoton] = useState(false);
  const [mensaje, setMensaje] = useState("");

  // 🎯 1. EVENTO onClick - CLIC SIMPLE
  const manejarClic = () => {
    setContadorClics(contadorClics + 1);
    setMensaje("✅ ¡Botón clickeado!");
  };

  // 🎯 2. EVENTO onDoubleClick - DOBLE CLIC
  const manejarDobleClic = () => {
    setContadorClics(0);
    setMensaje("🔄 Contador reiniciado con doble clic");
  };

  // 🎯 3. EVENTO onChange - CAMBIO EN INPUT
  const manejarCambioTexto = (evento) => {
    setTextoInput(evento.target.value);
    setMensaje("📝 Escribiendo...");
  };

  // 🎯 4. EVENTO onMouseEnter - MOUSE ENTRA
  const manejarMouseEntra = () => {
    setEstaSobreBoton(true);
    setMensaje("🐭 Mouse sobre el botón");
  };

  // 🎯 5. EVENTO onMouseLeave - MOUSE SALE
  const manejarMouseSale = () => {
    setEstaSobreBoton(false);
    setMensaje("🚀 Mouse salió del botón");
  };

  // 🎯 6. EVENTO onSubmit - ENVÍO DE FORMULARIO
  const manejarEnvioFormulario = (evento) => {
    evento.preventDefault();
    setMensaje(`📨 Formulario enviado: ${email}`);
    setEmail(""); // Limpiar el input
  };

  // 🎯 7. EVENTO onKeyDown - TECLA PRESIONADA
  const manejarTecla = (evento) => {
    if (evento.key === "Enter") {
      setMensaje("↵ Enter presionado");
    }
  };

  return (
    <Card className="shadow-sm">
      <Card.Header>
        <h5 className="mb-0">🎮 Demo de Eventos en React</h5>
      </Card.Header>

      <Card.Body>
        {/* 📊 PANEL DE INFORMACIÓN */}
        <Alert variant="info" className="mb-3">
          <strong>📈 Contador de clics:</strong> {contadorClics}
          <br />
          <strong>🎯 Sobre botón:</strong> {estaSobreBoton ? "SÍ" : "NO"}
        </Alert>

        {/* 📝 MENSAJE DE EVENTOS */}
        {mensaje && (
          <Alert variant="success" className="mb-3">
            {mensaje}
          </Alert>
        )}

        {/* 🎯 BOTÓN CON MÚLTIPLES EVENTOS */}
        <div className="mb-3">
          <Button
            variant={estaSobreBoton ? "warning" : "primary"}
            onClick={manejarClic}
            onDoubleClick={manejarDobleClic}
            onMouseEnter={manejarMouseEntra}
            onMouseLeave={manejarMouseSale}
            className="w-100"
          >
            {estaSobreBoton ? "🎯 ¡Estás sobre mí!" : "Haz clic o doble clic"}
          </Button>
          <small className="text-muted">
            Clic normal: +1 | Doble clic: Reiniciar
          </small>
        </div>

        {/* ⌨️ INPUT CON EVENTOS DE TECLADO */}
        <Form.Group className="mb-3">
          <Form.Label>Escribe algo (onChange):</Form.Label>
          <Form.Control
            type="text"
            value={textoInput}
            onChange={manejarCambioTexto}
            onKeyDown={manejarTecla}
            placeholder="Escribe y presiona Enter..."
          />
          <Form.Text className="text-muted">Texto: "{textoInput}"</Form.Text>
        </Form.Group>

        {/* 📧 FORMULARIO CON onSubmit */}
        <Form onSubmit={manejarEnvioFormulario}>
          <Form.Group className="mb-3">
            <Form.Label>Email (formulario):</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
              required
            />
          </Form.Group>
          <Button type="submit" variant="success" className="w-100">
            📨 Enviar Formulario
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default DemoEventos;
