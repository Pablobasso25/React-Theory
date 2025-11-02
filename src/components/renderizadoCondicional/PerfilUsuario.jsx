// src/components/PerfilUsuario.jsx
import React, { useState } from "react";
import { Card, Button, Badge, Alert, Tabs, Tab } from "react-bootstrap";

function PerfilUsuario() {
  // 🎯 ESTADOS PARA EL PERFIL
  const [usuario, setUsuario] = useState({
    nombre: "Ana García",
    email: "ana@email.com",
    rol: "usuario", // 'usuario', 'admin', 'moderador'
    estaVerificado: false,
    suscripcion: "gratuita", // 'gratuita', 'premium', 'empresa'
  });

  const [estaEditando, setEstaEditando] = useState(false);
  const [pestaniaActiva, setPestaniaActiva] = useState("perfil");

  // 🎯 FUNCIONES PARA CAMBIAR ESTADO
  const verificarCuenta = () => {
    setUsuario({ ...usuario, estaVerificado: true });
  };

  const cambiarRol = (nuevoRol) => {
    setUsuario({ ...usuario, rol: nuevoRol });
  };

  const cambiarSuscripcion = (nuevaSuscripcion) => {
    setUsuario({ ...usuario, suscripcion: nuevaSuscripcion });
  };

  // 🎯 RENDERIZADO CONDICIONAL - BADGE DE VERIFICACIÓN
  const renderBadgeVerificacion = () => {
    return usuario.estaVerificado ? (
      <Badge bg="success" className="ms-2">
        ✅ Verificado
      </Badge>
    ) : (
      <Badge bg="warning" className="ms-2">
        ⚠️ No verificado
      </Badge>
    );
  };

  // 🎯 RENDERIZADO CONDICIONAL - BADGE DE ROL
  const renderBadgeRol = () => {
    switch (usuario.rol) {
      case "admin":
        return <Badge bg="danger">👑 Administrador</Badge>;
      case "moderador":
        return <Badge bg="info">🛡️ Moderador</Badge>;
      default:
        return <Badge bg="secondary">👤 Usuario</Badge>;
    }
  };

  // 🎯 RENDERIZADO CONDICIONAL - BADGE DE SUSCRIPCIÓN
  const renderBadgeSuscripcion = () => {
    switch (usuario.suscripcion) {
      case "premium":
        return <Badge bg="warning">⭐ Premium</Badge>;
      case "empresa":
        return <Badge bg="success">🏢 Empresa</Badge>;
      default:
        return <Badge bg="outline-secondary">🎯 Gratuita</Badge>;
    }
  };

  // 🎯 RENDERIZADO CONDICIONAL - MENSAJE DE BIENVENIDA
  const renderMensajeBienvenida = () => {
    if (usuario.rol === "admin") {
      return (
        <Alert variant="danger" className="mb-3">
          <strong>¡Hola Administrador!</strong> Tienes acceso completo al
          sistema.
        </Alert>
      );
    } else if (usuario.rol === "moderador") {
      return (
        <Alert variant="info" className="mb-3">
          <strong>¡Hola Moderador!</strong> Puedes gestionar contenido de
          usuarios.
        </Alert>
      );
    } else {
      return (
        <Alert variant="success" className="mb-3">
          <strong>¡Hola Usuario!</strong> Bienvenido a nuestra plataforma.
        </Alert>
      );
    }
  };

  // 🎯 RENDERIZADO CONDICIONAL - BOTONES DE ACCIÓN
  const renderBotonesAccion = () => {
    return (
      <div className="d-grid gap-2 d-md-flex">
        {/* Este botón solo se muestra si NO está verificado */}
        {!usuario.estaVerificado && (
          <Button variant="outline-success" onClick={verificarCuenta}>
            ✅ Verificar Cuenta
          </Button>
        )}

        {/* Este botón siempre se muestra */}
        <Button
          variant="outline-primary"
          onClick={() => setEstaEditando(!estaEditando)}
        >
          {estaEditando ? "❌ Cancelar Edición" : "✏️ Editar Perfil"}
        </Button>
      </div>
    );
  };

  return (
    <Card className="shadow-sm">
      <Card.Header>
        <div className="d-flex justify-content-between align-items-center">
          <h5 className="mb-0">👤 Perfil de Usuario</h5>
          {renderBadgeRol()}
        </div>
      </Card.Header>

      <Card.Body>
        {/* 🎯 MENSAJE CONDICIONAL DE BIENVENIDA */}
        {renderMensajeBienvenida()}

        {/* 📊 INFORMACIÓN DEL USUARIO */}
        <div className="mb-4">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <strong>Nombre:</strong>
            <span>
              {usuario.nombre} {renderBadgeVerificacion()}
            </span>
          </div>

          <div className="d-flex justify-content-between align-items-center mb-2">
            <strong>Email:</strong>
            <span>{usuario.email}</span>
          </div>

          <div className="d-flex justify-content-between align-items-center mb-2">
            <strong>Suscripción:</strong>
            {renderBadgeSuscripcion()}
          </div>
        </div>

        {/* 🎯 BOTONES CONDICIONALES */}
        {renderBotonesAccion()}

        {/* 🎯 SECCIÓN DE EDICIÓN (condicional) */}
        {estaEditando && (
          <Card className="mt-3 bg-light">
            <Card.Body>
              <h6>⚙️ Opciones de Edición</h6>

              <div className="mb-3">
                <strong>Cambiar Rol:</strong>
                <div className="mt-1">
                  <Button
                    size="sm"
                    variant={
                      usuario.rol === "usuario" ? "primary" : "outline-primary"
                    }
                    onClick={() => cambiarRol("usuario")}
                    className="me-1"
                  >
                    Usuario
                  </Button>
                  <Button
                    size="sm"
                    variant={
                      usuario.rol === "moderador" ? "info" : "outline-info"
                    }
                    onClick={() => cambiarRol("moderador")}
                    className="me-1"
                  >
                    Moderador
                  </Button>
                  <Button
                    size="sm"
                    variant={
                      usuario.rol === "admin" ? "danger" : "outline-danger"
                    }
                    onClick={() => cambiarRol("admin")}
                  >
                    Administrador
                  </Button>
                </div>
              </div>

              <div>
                <strong>Cambiar Suscripción:</strong>
                <div className="mt-1">
                  <Button
                    size="sm"
                    variant={
                      usuario.suscripcion === "gratuita"
                        ? "secondary"
                        : "outline-secondary"
                    }
                    onClick={() => cambiarSuscripcion("gratuita")}
                    className="me-1"
                  >
                    Gratuita
                  </Button>
                  <Button
                    size="sm"
                    variant={
                      usuario.suscripcion === "premium"
                        ? "warning"
                        : "outline-warning"
                    }
                    onClick={() => cambiarSuscripcion("premium")}
                    className="me-1"
                  >
                    Premium
                  </Button>
                  <Button
                    size="sm"
                    variant={
                      usuario.suscripcion === "empresa"
                        ? "success"
                        : "outline-success"
                    }
                    onClick={() => cambiarSuscripcion("empresa")}
                  >
                    Empresa
                  </Button>
                </div>
              </div>
            </Card.Body>
          </Card>
        )}
      </Card.Body>
    </Card>
  );
}

export default PerfilUsuario;
