// src/components/FormularioRegistro.jsx
import React, { useState } from "react";
import {
  Card,
  Form,
  Button,
  Alert,
  ProgressBar,
  ListGroup,
  Badge,
} from "react-bootstrap";

function FormularioRegistro() {
  // 🎯 ESTADOS PARA EL FORMULARIO
  const [formulario, setFormulario] = useState({
    nombre: "",
    email: "",
    password: "",
    confirmarPassword: "",
  });

  // 🎯 ESTADOS PARA VALIDACIÓN DE PASSWORD
  const [longitud, setLongitud] = useState(0);
  const [tieneMayuscula, setTieneMayuscula] = useState(false);
  const [tieneMinuscula, setTieneMinuscula] = useState(false);
  const [tieneNumero, setTieneNumero] = useState(false);
  const [fuerzaPassword, setFuerzaPassword] = useState(0);

  // 🎯 ESTADOS PARA FEEDBACK
  const [passwordsCoinciden, setPasswordsCoinciden] = useState(true);
  const [emailValido, setEmailValido] = useState(true);
  const [registroExitoso, setRegistroExitoso] = useState(false);
  const [estaEnviando, setEstaEnviando] = useState(false);

  // 🎯 MANEJADOR PARA TODOS LOS CAMPOS
  const manejarCambio = (evento) => {
    const { name, value } = evento.target;

    // Actualizar el campo específico
    setFormulario({
      ...formulario,
      [name]: value,
    });

    // 📧 VALIDACIÓN ESPECÍFICA PARA EMAIL
    if (name === "email") {
      setEmailValido(validarEmail(value));
    }

    // 🔐 VALIDACIÓN ESPECÍFICA PARA PASSWORD
    if (name === "password") {
      validarPassword(value);
    }

    // 🔄 VALIDAR COINCIDENCIA DE PASSWORDS
    if (name === "confirmarPassword" || name === "password") {
      setPasswordsCoinciden(
        formulario.password === value || formulario.confirmarPassword === value
      );
    }
  };

  // 🎯 VALIDACIÓN DE EMAIL
  const validarEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  // 🎯 VALIDACIÓN COMPLETA DE PASSWORD
  const validarPassword = (password) => {
    setLongitud(password.length);
    setTieneMayuscula(/[A-Z]/.test(password));
    setTieneMinuscula(/[a-z]/.test(password));
    setTieneNumero(/\d/.test(password));

    // Calcular fuerza
    let fuerza = 0;
    fuerza += Math.min(password.length * 5, 40);
    if (/[A-Z]/.test(password)) fuerza += 20;
    if (/[a-z]/.test(password)) fuerza += 20;
    if (/\d/.test(password)) fuerza += 20;

    setFuerzaPassword(Math.min(fuerza, 100));
  };

  // 🎯 VERIFICAR SI EL FORMULARIO ES VÁLIDO
  const formularioEsValido = () => {
    return (
      formulario.nombre.length >= 2 &&
      validarEmail(formulario.email) &&
      fuerzaPassword >= 60 &&
      passwordsCoinciden &&
      formulario.password === formulario.confirmarPassword
    );
  };

  // 🎯 MANEJAR ENVÍO DEL FORMULARIO
  const manejarEnvio = async (evento) => {
    evento.preventDefault();
    setEstaEnviando(true);

    try {
      // 📤 SIMULAR ENVÍO A UNA API
      console.log("Enviando datos:", formulario);

      // ⏳ Simular delay de red
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // ✅ REGISTRO EXITOSO
      setRegistroExitoso(true);

      // 📧 SIMULAR ENVÍO DE CORREO (en una app real, esto lo haría el backend)
      console.log(`📧 Correo enviado a: ${formulario.email}`);
      console.log("Asunto: Bienvenido a nuestra plataforma");
      console.log("Mensaje: Gracias por registrarte...");
    } catch (error) {
      console.error("Error en el registro:", error);
    } finally {
      setEstaEnviando(false);
    }
  };

  // 🎯 INFORMACIÓN DE FUERZA DE PASSWORD
  const obtenerInfoFuerza = () => {
    if (fuerzaPassword === 0)
      return { texto: "No ingresado", variant: "secondary" };
    if (fuerzaPassword < 40) return { texto: "Muy Débil", variant: "danger" };
    if (fuerzaPassword < 60) return { texto: "Débil", variant: "warning" };
    if (fuerzaPassword < 80) return { texto: "Buena", variant: "info" };
    return { texto: "Muy Fuerte", variant: "success" };
  };

  const infoFuerza = obtenerInfoFuerza();

  // 🎯 RESETEAR FORMULARIO
  const resetearFormulario = () => {
    setFormulario({
      nombre: "",
      email: "",
      password: "",
      confirmarPassword: "",
    });
    setRegistroExitoso(false);
    setFuerzaPassword(0);
  };

  // SI EL REGISTRO FUE EXITOSO, MOSTRAR MENSAJE DE CONFIRMACIÓN
  if (registroExitoso) {
    return (
      <Card className="shadow-sm text-center">
        <Card.Body className="py-5">
          <div className="mb-4">
            <span style={{ fontSize: "4rem" }}>🎉</span>
          </div>
          <h3>¡Registro Exitoso!</h3>
          <p className="text-muted mb-4">
            Te hemos enviado un correo de confirmación a:
            <br />
            <strong>{formulario.email}</strong>
          </p>
          <Button variant="primary" onClick={resetearFormulario}>
            Registrar Otro Usuario
          </Button>
        </Card.Body>
      </Card>
    );
  }

  return (
    <Card className="shadow-sm">
      <Card.Header>
        <h5 className="mb-0">📝 Formulario de Registro</h5>
      </Card.Header>

      <Card.Body>
        <Form onSubmit={manejarEnvio}>
          {/* 👤 CAMPO NOMBRE */}
          <Form.Group className="mb-3">
            <Form.Label>Nombre completo *</Form.Label>
            <Form.Control
              type="text"
              name="nombre"
              value={formulario.nombre}
              onChange={manejarCambio}
              placeholder="Tu nombre completo"
              required
              minLength={2}
            />
            {formulario.nombre && formulario.nombre.length < 2 && (
              <Form.Text className="text-danger">
                El nombre debe tener al menos 2 caracteres
              </Form.Text>
            )}
          </Form.Group>

          {/* 📧 CAMPO EMAIL */}
          <Form.Group className="mb-3">
            <Form.Label>Email *</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formulario.email}
              onChange={manejarCambio}
              placeholder="tu@email.com"
              required
              isInvalid={formulario.email && !emailValido}
            />
            {formulario.email && !emailValido && (
              <Form.Text className="text-danger">
                Por favor ingresa un email válido
              </Form.Text>
            )}
          </Form.Group>

          {/* 🔐 CAMPO PASSWORD */}
          <Form.Group className="mb-3">
            <Form.Label>Contraseña *</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={formulario.password}
              onChange={manejarCambio}
              placeholder="Crea una contraseña segura"
              required
            />

            {/* 📊 INDICADOR DE FUERZA */}
            {formulario.password && (
              <div className="mt-2">
                <div className="d-flex justify-content-between align-items-center mb-1">
                  <small>Fuerza de la contraseña:</small>
                  <Badge bg={infoFuerza.variant}>{infoFuerza.texto}</Badge>
                </div>
                <ProgressBar
                  now={fuerzaPassword}
                  variant={infoFuerza.variant}
                  className="mb-2"
                />

                {/* ✅ LISTA DE REQUISITOS */}
                <ListGroup>
                  <ListGroup.Item className="py-1 px-2">
                    <small
                      className={longitud >= 8 ? "text-success" : "text-muted"}
                    >
                      {longitud >= 8 ? "✅" : "⭕"} Al menos 8 caracteres (
                      {longitud}/8)
                    </small>
                  </ListGroup.Item>
                  <ListGroup.Item className="py-1 px-2">
                    <small
                      className={tieneMayuscula ? "text-success" : "text-muted"}
                    >
                      {tieneMayuscula ? "✅" : "⭕"} Letra mayúscula
                    </small>
                  </ListGroup.Item>
                  <ListGroup.Item className="py-1 px-2">
                    <small
                      className={tieneMinuscula ? "text-success" : "text-muted"}
                    >
                      {tieneMinuscula ? "✅" : "⭕"} Letra minúscula
                    </small>
                  </ListGroup.Item>
                  <ListGroup.Item className="py-1 px-2">
                    <small
                      className={tieneNumero ? "text-success" : "text-muted"}
                    >
                      {tieneNumero ? "✅" : "⭕"} Al menos un número
                    </small>
                  </ListGroup.Item>
                </ListGroup>
              </div>
            )}
          </Form.Group>

          {/* 🔄 CONFIRMAR PASSWORD */}
          <Form.Group className="mb-4">
            <Form.Label>Confirmar contraseña *</Form.Label>
            <Form.Control
              type="password"
              name="confirmarPassword"
              value={formulario.confirmarPassword}
              onChange={manejarCambio}
              placeholder="Repite tu contraseña"
              required
              isInvalid={!passwordsCoinciden}
            />
            {!passwordsCoinciden && (
              <Form.Text className="text-danger">
                Las contraseñas no coinciden
              </Form.Text>
            )}
          </Form.Group>

          {/* 🎯 BOTÓN DE REGISTRO */}
          <Button
            variant="primary"
            type="submit"
            disabled={!formularioEsValido() || estaEnviando}
            className="w-100"
          >
            {estaEnviando ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" />
                Registrando...
              </>
            ) : (
              "📝 Registrarse"
            )}
          </Button>
        </Form>

        {/* 💡 INFORMACIÓN ADICIONAL */}
        <Alert variant="info" className="mt-3 small">
          <strong>💡 Después del registro:</strong>
          <br />
          • Recibirás un correo de confirmación
          <br />
          • Podrás iniciar sesión en la plataforma
          <br />• Tus datos estarán seguros
        </Alert>
      </Card.Body>
    </Card>
  );
}

export default FormularioRegistro;
