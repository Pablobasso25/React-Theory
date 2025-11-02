// src/components/BuscadorUsuarios.jsx
import React, { useState, useEffect } from "react";
import {
  Card,
  Form,
  Button,
  Alert,
  Spinner,
  ListGroup,
  Badge,
} from "react-bootstrap";

function BuscadorUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [terminoBusqueda, setTerminoBusqueda] = useState("");
  const [estaCargando, setEstaCargando] = useState(false);
  const [error, setError] = useState(null);
  const [busquedasRealizadas, setBusquedasRealizadas] = useState(0);

  // 🎯 useEffect 1: CARGAR USUARIOS INICIALES al montar
  useEffect(() => {
    console.log("🚀 Cargando usuarios iniciales...");
    cargarUsuarios();
  }, []); // ← Solo al montar

  // 🎯 useEffect 2: BUSCAR cuando el término cambia (con debounce)
  useEffect(() => {
    if (terminoBusqueda.trim() === "") return;

    // ⏳ Debounce: esperar 500ms después de que el usuario deje de escribir
    const timeoutId = setTimeout(() => {
      buscarUsuarios();
    }, 500);

    // 🎯 LIMPIEZA: cancelar el timeout si el usuario sigue escribiendo
    return () => clearTimeout(timeoutId);
  }, [terminoBusqueda]); // ← Se ejecuta cuando terminoBusqueda cambia

  const cargarUsuarios = async () => {
    setEstaCargando(true);
    setError(null);

    try {
      // 🎯 API pública de JSONPlaceholder
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );

      if (!response.ok) {
        throw new Error("Error al cargar usuarios");
      }

      const data = await response.json();
      setUsuarios(data);
      console.log("✅ Usuarios cargados:", data.length);
    } catch (err) {
      setError(err.message);
      console.error("❌ Error:", err);
    } finally {
      setEstaCargando(false);
    }
  };

  const buscarUsuarios = async () => {
    if (terminoBusqueda.trim() === "") {
      cargarUsuarios();
      return;
    }

    setEstaCargando(true);
    setError(null);

    try {
      // 🎯 Buscar en los usuarios cargados (simulación)
      const usuariosFiltrados = usuarios.filter(
        (usuario) =>
          usuario.name.toLowerCase().includes(terminoBusqueda.toLowerCase()) ||
          usuario.email.toLowerCase().includes(terminoBusqueda.toLowerCase())
      );

      setUsuarios(usuariosFiltrados);
      setBusquedasRealizadas((prev) => prev + 1);
      console.log("🔍 Búsqueda completada:", terminoBusqueda);
    } catch (err) {
      setError(err.message);
    } finally {
      setEstaCargando(false);
    }
  };

  return (
    <Card className="shadow-sm">
      <Card.Header>
        <div className="d-flex justify-content-between align-items-center">
          <h5 className="mb-0">👥 Buscador de Usuarios</h5>
          <Badge bg="primary">Búsquedas: {busquedasRealizadas}</Badge>
        </div>
      </Card.Header>

      <Card.Body>
        {/* 🔍 BARRA DE BÚSQUEDA */}
        <Form.Group className="mb-3">
          <Form.Label>Buscar usuarios:</Form.Label>
          <div className="d-flex gap-2">
            <Form.Control
              type="text"
              value={terminoBusqueda}
              onChange={(e) => setTerminoBusqueda(e.target.value)}
              placeholder="Buscar por nombre o email..."
            />
            <Button
              variant="primary"
              onClick={buscarUsuarios}
              disabled={estaCargando}
            >
              {estaCargando ? <Spinner size="sm" /> : "🔍"}
            </Button>
          </div>
          <Form.Text className="text-muted">
            La búsqueda se ejecuta automáticamente mientras escribes
          </Form.Text>
        </Form.Group>

        {/* 🎯 ESTADOS DE CARGA Y ERROR */}
        {estaCargando && (
          <div className="text-center my-4">
            <Spinner animation="border" role="status" />
            <div className="mt-2 text-muted">Cargando usuarios...</div>
          </div>
        )}

        {error && (
          <Alert variant="danger">
            <strong>Error:</strong> {error}
            <div className="mt-2">
              <Button
                variant="outline-danger"
                size="sm"
                onClick={cargarUsuarios}
              >
                Reintentar
              </Button>
            </div>
          </Alert>
        )}

        {/* 📋 LISTA DE USUARIOS */}
        {!estaCargando && !error && (
          <div>
            <div className="d-flex justify-content-between align-items-center mb-2">
              <strong>Usuarios encontrados: {usuarios.length}</strong>
              {terminoBusqueda && (
                <Badge bg="info">Buscando: "{terminoBusqueda}"</Badge>
              )}
            </div>

            {usuarios.length === 0 ? (
              <Alert variant="info" className="text-center">
                {terminoBusqueda
                  ? `No se encontraron usuarios para "${terminoBusqueda}"`
                  : "No hay usuarios para mostrar"}
              </Alert>
            ) : (
              <ListGroup>
                {usuarios.map((usuario) => (
                  <ListGroup.Item
                    key={usuario.id}
                    className="d-flex justify-content-between align-items-start"
                  >
                    <div>
                      <div className="fw-bold">{usuario.name}</div>
                      <div className="text-muted small">{usuario.email}</div>
                      <div className="small">{usuario.company?.name}</div>
                    </div>
                    <Badge bg="outline-primary">{usuario.username}</Badge>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
          </div>
        )}

        {/* 💡 INFORMACIÓN SOBRE useEffect */}
        <Alert variant="info" className="mt-3 small">
          <strong>🎯 useEffect en este componente:</strong>
          <br />• <strong>Al montar:</strong> Carga usuarios iniciales de API
          <br />• <strong>Al buscar:</strong> Debounce automático (500ms)
          <br />• <strong>Limpieza:</strong> Cancela timeout anterior
        </Alert>
      </Card.Body>
    </Card>
  );
}

export default BuscadorUsuarios;
