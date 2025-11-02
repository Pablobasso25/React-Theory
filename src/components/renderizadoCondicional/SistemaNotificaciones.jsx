// src/components/SistemaNotificaciones.jsx - VERSIÓN COMPLETA
import React, { useState, useEffect } from "react";
import { Card, Button, Alert, Badge } from "react-bootstrap";

function SistemaNotificaciones() {
  const [notificaciones, setNotificaciones] = useState([]);
  const [mostrarTodas, setMostrarTodas] = useState(false);

  // 🎯 AGREGAR NOTIFICACIÓN
  const agregarNotificacion = (tipo, mensaje) => {
    const nuevaNotificacion = {
      id: Date.now(),
      tipo,
      mensaje,
      timestamp: new Date(),
      leida: false,
    };

    setNotificaciones((prev) => [nuevaNotificacion, ...prev]);
  };

  // 🎯 ELIMINAR NOTIFICACIÓN
  const eliminarNotificacion = (id) => {
    setNotificaciones((prev) => prev.filter((notif) => notif.id !== id));
  };

  // 🎯 MARCAR COMO LEÍDA
  const marcarComoLeida = (id) => {
    setNotificaciones((prev) =>
      prev.map((notif) => (notif.id === id ? { ...notif, leida: true } : notif))
    );
  };

  // 🎯 OBTENER ESTILOS SEGÚN TIPO
  const obtenerEstilosNotificacion = (tipo) => {
    switch (tipo) {
      case "exito":
        return { variant: "success", icono: "✅" };
      case "error":
        return { variant: "danger", icono: "❌" };
      case "advertencia":
        return { variant: "warning", icono: "⚠️" };
      case "info":
        return { variant: "info", icono: "ℹ️" };
      default:
        return { variant: "secondary", icono: "📢" };
    }
  };

  // 🎯 CONTADOR DE NO LEÍDAS
  const notificacionesNoLeidas = notificaciones.filter((n) => !n.leida).length;

  // 🎯 AUTO-ELIMINAR NOTIFICACIONES DESPUÉS DE 5 SEGUNDOS
  useEffect(() => {
    const timer = setInterval(() => {
      if (notificaciones.length > 0) {
        const ahora = new Date();
        setNotificaciones((prev) =>
          prev.filter((notif) => ahora - notif.timestamp < 5000)
        );
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [notificaciones]);

  // 🎯 LIMPIAR TODAS LAS NOTIFICACIONES
  const limpiarTodas = () => {
    setNotificaciones([]);
  };

  return (
    <Card className="shadow-sm">
      <Card.Header>
        <div className="d-flex justify-content-between align-items-center">
          <h5 className="mb-0">🔔 Sistema de Notificaciones</h5>
          <div>
            {notificacionesNoLeidas > 0 && (
              <Badge bg="danger" className="me-2">
                {notificacionesNoLeidas} no leídas
              </Badge>
            )}
            {notificaciones.length > 0 && (
              <Button variant="outline-danger" size="sm" onClick={limpiarTodas}>
                🗑️ Limpiar Todas
              </Button>
            )}
          </div>
        </div>
      </Card.Header>

      <Card.Body>
        {/* 🎯 BOTONES PARA GENERAR NOTIFICACIONES */}
        <div className="mb-4">
          <strong>Generar notificaciones de prueba:</strong>
          <div className="mt-2 d-flex flex-wrap gap-2">
            <Button
              variant="success"
              size="sm"
              onClick={() =>
                agregarNotificacion("exito", "¡Operación completada con éxito!")
              }
            >
              ✅ Éxito
            </Button>
            <Button
              variant="danger"
              size="sm"
              onClick={() =>
                agregarNotificacion(
                  "error",
                  "Ha ocurrido un error en el sistema"
                )
              }
            >
              ❌ Error
            </Button>
            <Button
              variant="warning"
              size="sm"
              onClick={() =>
                agregarNotificacion(
                  "advertencia",
                  "Advertencia: Espacio de almacenamiento al 90%"
                )
              }
            >
              ⚠️ Advertencia
            </Button>
            <Button
              variant="info"
              size="sm"
              onClick={() =>
                agregarNotificacion("info", "Nueva actualización disponible")
              }
            >
              ℹ️ Información
            </Button>
          </div>
        </div>

        {/* 🔔 NOTIFICACIONES ACTIVAS */}
        <div className="mb-3">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <strong>Notificaciones Activas:</strong>
            {notificaciones.length > 0 && (
              <Button
                variant="outline-secondary"
                size="sm"
                onClick={() => setMostrarTodas(!mostrarTodas)}
              >
                {mostrarTodas ? "📋 Ocultar Antiguas" : "📋 Mostrar Todas"}
              </Button>
            )}
          </div>

          {/* 🎯 SIN NOTIFICACIONES */}
          {notificaciones.length === 0 && (
            <Alert variant="light" className="text-center text-muted">
              📭 No hay notificaciones
            </Alert>
          )}

          {/* 🎯 LISTA DE NOTIFICACIONES */}
          {(mostrarTodas ? notificaciones : notificaciones.slice(0, 3)).map(
            (notificacion) => {
              const estilos = obtenerEstilosNotificacion(notificacion.tipo);

              return (
                <Alert
                  key={notificacion.id}
                  variant={estilos.variant}
                  className="d-flex justify-content-between align-items-start mb-2"
                >
                  <div className="flex-grow-1">
                    <div className="d-flex align-items-center mb-1">
                      <span className="me-2">{estilos.icono}</span>
                      <strong>
                        {notificacion.tipo.charAt(0).toUpperCase() +
                          notificacion.tipo.slice(1)}
                      </strong>
                      {!notificacion.leida && (
                        <Badge bg="dark" className="ms-2">
                          NUEVO
                        </Badge>
                      )}
                    </div>
                    <div className="small">{notificacion.mensaje}</div>
                    <div className="small text-muted mt-1">
                      {notificacion.timestamp.toLocaleTimeString()}
                    </div>
                  </div>

                  <div className="d-flex gap-1 ms-2">
                    {!notificacion.leida && (
                      <Button
                        variant="outline-dark"
                        size="sm"
                        onClick={() => marcarComoLeida(notificacion.id)}
                      >
                        👁️
                      </Button>
                    )}
                    <Button
                      variant="outline-dark"
                      size="sm"
                      onClick={() => eliminarNotificacion(notificacion.id)}
                    >
                      ✕
                    </Button>
                  </div>
                </Alert>
              );
            }
          )}

          {/* 🎯 MOSTRAR CONTADOR SI HAY MÁS */}
          {!mostrarTodas && notificaciones.length > 3 && (
            <div className="text-center mt-2">
              <Badge bg="secondary">
                +{notificaciones.length - 3} notificaciones más...
              </Badge>
            </div>
          )}
        </div>

        {/* 💡 INFORMACIÓN */}
        <Alert variant="info" className="small">
          <strong>💡 Características:</strong>
          <br />
          • Notificaciones se auto-eliminan después de 5 segundos
          <br />
          • Máximo 3 notificaciones visibles por defecto
          <br />
          • Contador de notificaciones no leídas
          <br />• Marcado individual como leído
        </Alert>
      </Card.Body>
    </Card>
  );
}

export default SistemaNotificaciones;
