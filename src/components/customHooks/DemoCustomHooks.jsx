// src/components/DemoCustomHooks.jsx
import React, { useState } from "react";
import {
  Card,
  Button,
  Badge,
  Alert,
  Form,
  ListGroup,
  Row,
  Col,
} from "react-bootstrap";
import useLocalStorage from "../hooks/useLocalStorage";
import useToggle from "../hooks/useToggle";
import useFetch from "../hooks/useFetch";

function DemoCustomHooks() {
  // 🎯 USO DE useLocalStorage
  const [nombre, setNombre] = useLocalStorage("usuario-nombre", "");
  const [temaOscuro, setTemaOscuro] = useLocalStorage("tema-oscuro", false);

  // 🎯 USO DE useToggle
  const { valor: estaActivo, toggle: toggleActivo } = useToggle(true);
  const { valor: mostrarDetalles, toggle: toggleDetalles } = useToggle(false);

  // 🎯 USO DE useFetch
  const {
    datos: usuarios,
    estaCargando,
    error,
    refetch,
  } = useFetch("https://jsonplaceholder.typicode.com/users");

  return (
    <Card
      className="shadow-sm"
      style={{
        backgroundColor: temaOscuro ? "#2c3e50" : "white",
        color: temaOscuro ? "white" : "black",
      }}
    >
      <Card.Header
        style={{ backgroundColor: temaOscuro ? "#34495e" : undefined }}
      >
        <div className="d-flex justify-content-between align-items-center">
          <h5 className="mb-0">🎯 Demo: Custom Hooks</h5>
          <div>
            <Badge bg={estaActivo ? "success" : "secondary"} className="me-2">
              {estaActivo ? "ACTIVO" : "INACTIVO"}
            </Badge>
            <Badge
              bg={temaOscuro ? "dark" : "light"}
              text={temaOscuro ? "light" : "dark"}
            >
              {temaOscuro ? "🌙 Oscuro" : "☀️ Claro"}
            </Badge>
          </div>
        </div>
      </Card.Header>

      <Card.Body>
        {/* 🎯 SECCIÓN 1: useLocalStorage */}
        <div className="mb-4">
          <h6>💾 useLocalStorage</h6>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Tu nombre (se guarda automáticamente):</Form.Label>
                <Form.Control
                  type="text"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  placeholder="Escribe tu nombre..."
                />
                <Form.Text className="text-muted">
                  Recarga la página y verás que se mantiene
                </Form.Text>
              </Form.Group>
            </Col>
            <Col md={6}>
              <div className="d-flex align-items-end h-100">
                <Button
                  variant={temaOscuro ? "light" : "dark"}
                  onClick={() => setTemaOscuro(!temaOscuro)}
                  className="w-100"
                >
                  {temaOscuro ? "☀️ Tema Claro" : "🌙 Tema Oscuro"}
                </Button>
              </div>
            </Col>
          </Row>

          {nombre && (
            <Alert variant="success" className="py-2">
              <strong>¡Hola {nombre}!</strong> Tu nombre está guardado en
              localStorage.
            </Alert>
          )}
        </div>

        {/* 🎯 SECCIÓN 2: useToggle */}
        <div className="mb-4">
          <h6>🔘 useToggle</h6>
          <div className="d-flex gap-2 flex-wrap mb-3">
            <Button
              variant={estaActivo ? "success" : "secondary"}
              onClick={toggleActivo}
            >
              {estaActivo ? "✅ Activado" : "❌ Desactivado"}
            </Button>

            <Button
              variant={mostrarDetalles ? "info" : "outline-info"}
              onClick={toggleDetalles}
            >
              {mostrarDetalles ? "📋 Ocultar Detalles" : "📋 Mostrar Detalles"}
            </Button>
          </div>

          {mostrarDetalles && (
            <Alert variant="info">
              <strong>Detalles del uso de useToggle:</strong>
              <br />• <code>estaActivo</code>: {estaActivo.toString()}
              <br />• <code>mostrarDetalles</code>: {mostrarDetalles.toString()}
              <br />• Los valores persisten entre re-renders
            </Alert>
          )}
        </div>

        {/* 🎯 SECCIÓN 3: useFetch */}
        <div>
          <h6>🌐 useFetch</h6>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <span>Usuarios desde API:</span>
            <Button
              variant="outline-primary"
              size="sm"
              onClick={refetch}
              disabled={estaCargando}
            >
              {estaCargando ? "🔄 Cargando..." : "🔄 Recargar"}
            </Button>
          </div>

          {error && (
            <Alert variant="danger">
              <strong>Error:</strong> {error}
            </Alert>
          )}

          {estaCargando && usuarios === null ? (
            <div className="text-center text-muted py-3">
              <div className="spinner-border spinner-border-sm me-2"></div>
              Cargando usuarios...
            </div>
          ) : (
            <ListGroup>
              {usuarios &&
                usuarios.slice(0, 3).map((usuario) => (
                  <ListGroup.Item
                    key={usuario.id}
                    style={{
                      backgroundColor: temaOscuro ? "#34495e" : undefined,
                      color: temaOscuro ? "white" : "black",
                    }}
                  >
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <strong>{usuario.name}</strong>
                        <div className="small text-muted">{usuario.email}</div>
                      </div>
                      <Badge bg="primary">{usuario.username}</Badge>
                    </div>
                  </ListGroup.Item>
                ))}
            </ListGroup>
          )}

          {usuarios && (
            <div className="text-center mt-2">
              <Badge bg="secondary">
                Mostrando {Math.min(usuarios.length, 3)} de {usuarios.length}{" "}
                usuarios
              </Badge>
            </div>
          )}
        </div>

        {/* 💡 INFORMACIÓN SOBRE CUSTOM HOOKS */}
        <Alert variant="info" className="mt-4 small">
          <strong>🎯 Custom Hooks en este componente:</strong>
          <br />• <strong>useLocalStorage:</strong> Persistencia automática en
          localStorage
          <br />• <strong>useToggle:</strong> Alternar valores booleanos
          fácilmente
          <br />• <strong>useFetch:</strong> Manejo automático de peticiones
          HTTP
          <br />• <strong>Beneficio:</strong> Lógica reutilizable y componentes
          más limpios
        </Alert>
      </Card.Body>
    </Card>
  );
}

export default DemoCustomHooks;
