// src/components/HooksAvanzados.jsx
import React, { useState } from "react";
import { Card, Form, Alert, Badge, Button } from "react-bootstrap";
import useDebounce from "../../hooks/useDebounce";
import useOnlineStatus from "../../hooks/useOnlineStatus";
import useLocalStorage from "../../hooks/useLocalStorage";
import useToggle from "../../hooks/useToggle";

function HooksAvanzados() {
  // 🎯 USO DE useOnlineStatus
  const estaOnline = useOnlineStatus();

  // 🎯 USO DE useDebounce
  const [terminoBusqueda, setTerminoBusqueda] = useState("");
  const terminoDebounce = useDebounce(terminoBusqueda, 800);

  // 🎯 USO DE useLocalStorage
  const [historialBusquedas, setHistorialBusquedas] = useLocalStorage(
    "historial-busquedas",
    []
  );

  // 🎯 USO DE useToggle
  const { valor: mostrarHistorial, toggle: toggleHistorial } = useToggle(false);

  // 🎯 EFFECT para guardar búsquedas en historial
  React.useEffect(() => {
    if (terminoDebounce && terminoDebounce.trim() !== "") {
      setHistorialBusquedas((prev) => {
        const nuevoHistorial = [
          terminoDebounce,
          ...prev.filter((item) => item !== terminoDebounce),
        ];
        return nuevoHistorial.slice(0, 5); // Mantener solo las 5 más recientes
      });
    }
  }, [terminoDebounce, setHistorialBusquedas]);

  return (
    <Card className="shadow-sm">
      <Card.Header>
        <div className="d-flex justify-content-between align-items-center">
          <h5 className="mb-0">⚡ Hooks Avanzados</h5>
          <Badge bg={estaOnline ? "success" : "danger"}>
            {estaOnline ? "🟢 En línea" : "🔴 Sin conexión"}
          </Badge>
        </div>
      </Card.Header>

      <Card.Body>
        {/* 🎯 BÚSQUEDA CON DEBOUNCE */}
        <div className="mb-4">
          <h6>🔍 Búsqueda con Debounce</h6>
          <Form.Group>
            <Form.Label>Buscar (con debounce de 800ms):</Form.Label>
            <Form.Control
              type="text"
              value={terminoBusqueda}
              onChange={(e) => setTerminoBusqueda(e.target.value)}
              placeholder="Escribe para buscar..."
            />
            <Form.Text className="text-muted">
              Término actual: "{terminoBusqueda}"
              <br />
              Término con debounce: "{terminoDebounce}"
            </Form.Text>
          </Form.Group>

          {terminoDebounce && (
            <Alert variant="success" className="mt-2 py-2">
              <strong>Buscando:</strong> "{terminoDebounce}"
              <br />
              <small>Esta búsqueda se ejecutó después del debounce</small>
            </Alert>
          )}
        </div>

        {/* 🎯 HISTORIAL DE BÚSQUEDAS */}
        <div className="mb-3">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <h6 className="mb-0">📚 Historial de Búsquedas</h6>
            <Button variant="outline-info" size="sm" onClick={toggleHistorial}>
              {mostrarHistorial ? "📋 Ocultar" : "📋 Mostrar"}
            </Button>
          </div>

          {mostrarHistorial && (
            <div>
              {historialBusquedas.length === 0 ? (
                <Alert variant="info" className="py-2">
                  No hay búsquedas en el historial
                </Alert>
              ) : (
                <div>
                  {historialBusquedas.map((busqueda, index) => (
                    <Badge
                      key={index}
                      bg="secondary"
                      className="me-1 mb-1"
                      style={{ cursor: "pointer" }}
                      onClick={() => setTerminoBusqueda(busqueda)}
                    >
                      {busqueda}
                    </Badge>
                  ))}
                </div>
              )}

              {historialBusquedas.length > 0 && (
                <Button
                  variant="outline-danger"
                  size="sm"
                  className="mt-2"
                  onClick={() => setHistorialBusquedas([])}
                >
                  🗑️ Limpiar Historial
                </Button>
              )}
            </div>
          )}
        </div>

        {/* 💡 INFORMACIÓN SOBRE HOOKS AVANZADOS */}
        <Alert variant="info" className="small">
          <strong>🎯 Custom Hooks Avanzados:</strong>
          <br />• <strong>useOnlineStatus:</strong> Detecta estado de conexión
          <br />• <strong>useDebounce:</strong> Retarda ejecución hasta que el
          usuario deje de escribir
          <br />• <strong>useLocalStorage:</strong> Persiste el historial
          automáticamente
          <br />• <strong>useToggle:</strong> Controla visibilidad del historial
        </Alert>
      </Card.Body>
    </Card>
  );
}

export default HooksAvanzados;
