// src/components/FormularioRegistro.jsx
import React, { useState } from "react";
import { useForm } from "react-hook-form";
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
  const [registroExitoso, setRegistroExitoso] = useState(false);
  const [estaEnviando, setEstaEnviando] = useState(false);

  // 🎯 Configuración de React Hook Form
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onChange", // Validar mientras se escribe
    defaultValues: {
      nombre: "",
      email: "",
      password: "",
      confirmarPassword: "",
    },
  });

  // 🎯 Observar cambios en el password para validaciones en tiempo real
  const password = watch("password");
  const confirmarPassword = watch("confirmarPassword");

  // 🎯 VALIDACIÓN COMPLETA DE PASSWORD
  const validarPassword = (password) => {
    if (!password) return { fuerza: 0, criterios: {} };

    const criterios = {
      longitud: password.length >= 8,
      mayuscula: /[A-Z]/.test(password),
      minuscula: /[a-z]/.test(password),
      numero: /\d/.test(password),
    };

    // Calcular fuerza
    let fuerza = 0;
    fuerza += Math.min(password.length * 5, 40);
    if (criterios.mayuscula) fuerza += 20;
    if (criterios.minuscula) fuerza += 20;
    if (criterios.numero) fuerza += 20;

    return {
      fuerza: Math.min(fuerza, 100),
      criterios,
    };
  };

  const { fuerza: fuerzaPassword, criterios } = validarPassword(password);

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

  // 🎯 MANEJAR ENVÍO DEL FORMULARIO
  const onSubmit = async (data) => {
    setEstaEnviando(true);

    try {
      // 📤 SIMULAR ENVÍO A UNA API
      console.log("Enviando datos:", data);

      // ⏳ Simular delay de red
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // ✅ REGISTRO EXITOSO
      setRegistroExitoso(true);

      // 📧 SIMULAR ENVÍO DE CORREO
      console.log(`📧 Correo enviado a: ${data.email}`);
    } catch (error) {
      console.error("Error en el registro:", error);
    } finally {
      setEstaEnviando(false);
    }
  };

  // 🎯 RESETEAR FORMULARIO
  const resetearFormulario = () => {
    reset();
    setRegistroExitoso(false);
  };

  // SI EL REGISTRO FUE EXITOSO, MOSTRAR MENSAJE DE CONFIRMACIÓN
  if (registroExitoso) {
    const email = watch("email");

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
            <strong>{email}</strong>
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
        <Form onSubmit={handleSubmit(onSubmit)}>
          {/* 👤 CAMPO NOMBRE */}
          <Form.Group className="mb-3">
            <Form.Label>Nombre completo *</Form.Label>
            <Form.Control
              type="text"
              placeholder="Tu nombre completo"
              isInvalid={errors.nombre}
              {...register("nombre", {
                required: "El nombre es obligatorio",
                minLength: {
                  value: 2,
                  message: "El nombre debe tener al menos 2 caracteres",
                },
                pattern: {
                  value: /^[A-Za-zÁáÉéÍíÓóÚúÑñ\s]+$/,
                  message: "El nombre solo puede contener letras",
                },
              })}
            />
            <Form.Control.Feedback type="invalid">
              {errors.nombre && errors.nombre.message}
            </Form.Control.Feedback>
          </Form.Group>

          {/* 📧 CAMPO EMAIL */}
          <Form.Group className="mb-3">
            <Form.Label>Email *</Form.Label>
            <Form.Control
              type="email"
              placeholder="tu@email.com"
              isInvalid={errors.email}
              {...register("email", {
                required: "El email es obligatorio",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Por favor ingresa un email válido",
                },
              })}
            />
            <Form.Control.Feedback type="invalid">
              {errors.email && errors.email.message}
            </Form.Control.Feedback>
          </Form.Group>

          {/* 🔐 CAMPO PASSWORD */}
          <Form.Group className="mb-3">
            <Form.Label>Contraseña *</Form.Label>
            <Form.Control
              type="password"
              placeholder="Crea una contraseña segura"
              isInvalid={errors.password}
              {...register("password", {
                required: "La contraseña es obligatoria",
                minLength: {
                  value: 8,
                  message: "La contraseña debe tener al menos 8 caracteres",
                },
                validate: {
                  fuerza: () =>
                    fuerzaPassword >= 60 || "La contraseña es muy débil",
                },
              })}
            />
            <Form.Control.Feedback type="invalid">
              {errors.password && errors.password.message}
            </Form.Control.Feedback>

            {/* 📊 INDICADOR DE FUERZA */}
            {password && (
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
                      className={
                        criterios.longitud ? "text-success" : "text-muted"
                      }
                    >
                      {criterios.longitud ? "✅" : "⭕"} Al menos 8 caracteres (
                      {password.length}/8)
                    </small>
                  </ListGroup.Item>
                  <ListGroup.Item className="py-1 px-2">
                    <small
                      className={
                        criterios.mayuscula ? "text-success" : "text-muted"
                      }
                    >
                      {criterios.mayuscula ? "✅" : "⭕"} Letra mayúscula
                    </small>
                  </ListGroup.Item>
                  <ListGroup.Item className="py-1 px-2">
                    <small
                      className={
                        criterios.minuscula ? "text-success" : "text-muted"
                      }
                    >
                      {criterios.minuscula ? "✅" : "⭕"} Letra minúscula
                    </small>
                  </ListGroup.Item>
                  <ListGroup.Item className="py-1 px-2">
                    <small
                      className={
                        criterios.numero ? "text-success" : "text-muted"
                      }
                    >
                      {criterios.numero ? "✅" : "⭕"} Al menos un número
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
              placeholder="Repite tu contraseña"
              isInvalid={errors.confirmarPassword}
              {...register("confirmarPassword", {
                required: "Confirma tu contraseña",
                validate: (value) =>
                  value === password || "Las contraseñas no coinciden",
              })}
            />
            <Form.Control.Feedback type="invalid">
              {errors.confirmarPassword && errors.confirmarPassword.message}
            </Form.Control.Feedback>
          </Form.Group>

          {/* 🎯 BOTÓN DE REGISTRO */}
          <Button
            variant="primary"
            type="submit"
            disabled={estaEnviando}
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






