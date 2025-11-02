// src/components/ValidacionPassword.jsx
import React, { useState } from "react";
import {
  Card,
  Form,
  Alert,
  ProgressBar,
  ListGroup,
  Badge,
} from "react-bootstrap";

function ValidacionPassword() {
  // 🎯 MÚLTIPLES ESTADOS PARA LA VALIDACIÓN
  const [password, setPassword] = useState("");
  const [longitud, setLongitud] = useState(0);
  const [tieneMayuscula, setTieneMayuscula] = useState(false);
  const [tieneMinuscula, setTieneMinuscula] = useState(false);
  const [tieneNumero, setTieneNumero] = useState(false);
  const [tieneCaracterEspecial, setTieneCaracterEspecial] = useState(false);
  const [fuerzaPassword, setFuerzaPassword] = useState(0); // 0-100%

  // 🎯 MANEJADOR COMPLEJO - ACTUALIZA 7 ESTADOS A LA VEZ
  const manejarCambioPassword = (evento) => {
    const valor = evento.target.value;

    // 1. 📝 GUARDAR EL PASSWORD
    setPassword(valor);

    // 2. 📏 LONGITUD
    setLongitud(valor.length);

    // 3. 🔠 VALIDACIONES INDIVIDUALES
    setTieneMayuscula(/[A-Z]/.test(valor)); // ¿Tiene letras MAYÚSCULAS?
    setTieneMinuscula(/[a-z]/.test(valor)); // ¿Tiene letras minúsculas?
    setTieneNumero(/\d/.test(valor)); // ¿Tiene números?
    setTieneCaracterEspecial(/[!@#$%^&*(),.?":{}|<>]/.test(valor)); // ¿Tiene caracteres especiales?

    // 4. 💪 CALCULAR FUERZA DEL PASSWORD (0-100%)
    const nuevaFuerza = calcularFuerzaPassword(valor);
    setFuerzaPassword(nuevaFuerza);
  };

  // 🎯 FUNCIÓN PARA CALCULAR FUERZA
  const calcularFuerzaPassword = (pass) => {
    let fuerza = 0;

    // 📏 Longitud (máximo 40 puntos)
    fuerza += Math.min(pass.length * 5, 40);

    // 🔠 Mayúsculas (15 puntos)
    if (/[A-Z]/.test(pass)) fuerza += 15;

    // 🔡 Minúsculas (15 puntos)
    if (/[a-z]/.test(pass)) fuerza += 15;

    // 🔢 Números (15 puntos)
    if (/\d/.test(pass)) fuerza += 15;

    // ⭐ Caracteres especiales (15 puntos)
    if (/[!@#$%^&*(),.?":{}|<>]/.test(pass)) fuerza += 15;

    return Math.min(fuerza, 100); // Máximo 100%
  };

  // 🎯 DETERMINAR COLOR Y TEXTO DE LA FUERZA
  const obtenerInfoFuerza = () => {
    if (fuerzaPassword === 0)
      return {
        texto: "No ingresado",
        color: "secondary",
        variant: "secondary",
      };
    if (fuerzaPassword < 40)
      return { texto: "Muy Débil", color: "danger", variant: "danger" };
    if (fuerzaPassword < 60)
      return { texto: "Débil", color: "warning", variant: "warning" };
    if (fuerzaPassword < 80)
      return { texto: "Buena", color: "info", variant: "info" };
    return { texto: "Muy Fuerte", color: "success", variant: "success" };
  };

  const infoFuerza = obtenerInfoFuerza();

  return (
    <Card className="shadow-sm">
      <Card.Header>
        <h5 className="mb-0">🔐 Validador de Contraseña</h5>
      </Card.Header>

      <Card.Body>
        {/* 📝 INPUT DE PASSWORD */}
        <Form.Group className="mb-4">
          <Form.Label>
            <strong>Ingresa tu contraseña:</strong>
          </Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={manejarCambioPassword}
            placeholder="Escribe tu contraseña aquí..."
            className="mb-2"
          />
          <Form.Text className="text-muted">
            La contraseña se valida en tiempo real mientras escribes
          </Form.Text>
        </Form.Group>

        {/* 📊 BARRA DE FUERZA */}
        <div className="mb-4">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <span>
              <strong>Fuerza de la contraseña:</strong>
            </span>
            <Badge bg={infoFuerza.variant} className="fs-6">
              {infoFuerza.texto} ({fuerzaPassword}%)
            </Badge>
          </div>
          <ProgressBar
            now={fuerzaPassword}
            variant={infoFuerza.variant}
            animated={fuerzaPassword > 0}
            className="mb-3"
          />
        </div>

        {/* ✅ LISTA DE REQUISITOS */}
        <ListGroup className="mb-4">
          <ListGroup.Item className="d-flex justify-content-between align-items-center">
            <span>📏 Al menos 8 caracteres</span>
            <Badge bg={longitud >= 8 ? "success" : "secondary"}>
              {longitud}/8
            </Badge>
          </ListGroup.Item>

          <ListGroup.Item className="d-flex justify-content-between align-items-center">
            <span>🔠 Letra mayúscula (A-Z)</span>
            <Badge bg={tieneMayuscula ? "success" : "secondary"}>
              {tieneMayuscula ? "✅" : "❌"}
            </Badge>
          </ListGroup.Item>

          <ListGroup.Item className="d-flex justify-content-between align-items-center">
            <span>🔡 Letra minúscula (a-z)</span>
            <Badge bg={tieneMinuscula ? "success" : "secondary"}>
              {tieneMinuscula ? "✅" : "❌"}
            </Badge>
          </ListGroup.Item>

          <ListGroup.Item className="d-flex justify-content-between align-items-center">
            <span>🔢 Número (0-9)</span>
            <Badge bg={tieneNumero ? "success" : "secondary"}>
              {tieneNumero ? "✅" : "❌"}
            </Badge>
          </ListGroup.Item>

          <ListGroup.Item className="d-flex justify-content-between align-items-center">
            <span>⭐ Carácter especial (!@#$%...)</span>
            <Badge bg={tieneCaracterEspecial ? "success" : "secondary"}>
              {tieneCaracterEspecial ? "✅" : "❌"}
            </Badge>
          </ListGroup.Item>
        </ListGroup>

        {/* 💡 EJEMPLOS DE CONTRASEÑAS */}
        <Alert variant="info">
          <strong>💡 Prueba estas contraseñas:</strong>
          <br />
          <small>
            • "abc" → Muy débil
            <br />
            • "abc123" → Débil
            <br />
            • "Abc123" → Buena
            <br />• "Abc123!" → Muy fuerte
          </small>
        </Alert>

        {/* 🔍 DEBUG: MOSTRAR ESTADOS (opcional para aprendizaje) */}
        <details>
          <summary className="text-muted small">
            🔍 Ver estados internos (debug)
          </summary>
          <pre className="mt-2 small bg-light p-2">
            {JSON.stringify(
              {
                password,
                longitud,
                tieneMayuscula,
                tieneMinuscula,
                tieneNumero,
                tieneCaracterEspecial,
                fuerzaPassword,
              },
              null,
              2
            )}
          </pre>
        </details>
      </Card.Body>
    </Card>
  );
}

export default ValidacionPassword;
