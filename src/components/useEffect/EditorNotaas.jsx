// src/components/EditorNotas.jsx
import React, { useState, useEffect } from "react";
import { Card, Form, Button, Alert, Badge, ListGroup } from "react-bootstrap";

function EditorNotas() {
  const [notas, setNotas] = useState([]);
  const [nuevaNota, setNuevaNota] = useState("");
  const [ultimaActualizacion, setUltimaActualizacion] = useState(null);

  // 🎯 useEffect 1: CARGAR NOTAS DESDE localStorage AL MONTAR
  useEffect(() => {
    console.log("📝 Cargando notas desde localStorage...");

    try {
      const notasGuardadas = localStorage.getItem("notas-app");
      if (notasGuardadas) {
        const notasParseadas = JSON.parse(notasGuardadas);
        setNotas(notasParseadas);
        console.log("✅ Notas cargadas:", notasParseadas.length);
      }
    } catch (error) {
      console.error("❌ Error cargando notas:", error);
    }
  }, []); // ← Solo al montar

  // 🎯 useEffect 2: GUARDAR EN localStorage CUANDO LAS NOTAS CAMBIAN
  useEffect(() => {
    if (notas.length === 0) return;

    console.log("💾 Guardando notas en localStorage...");
    localStorage.setItem("notas-app", JSON.stringify(notas));
    setUltimaActualizacion(new Date());

    // 🎯 También podríamos mostrar una notificación temporal
    const timeout = setTimeout(() => {
      console.log("✅ Notas guardadas automáticamente");
    }, 1000);

    return () => clearTimeout(timeout);
  }, [notas]); // ← Se ejecuta cuando 'notas' cambia

  // 🎯 useEffect 3: ACTUALIZAR TÍTULO DEL DOCUMENTO
  useEffect(() => {
    document.title = `Notas App (${notas.length} notas)`;

    // 🎯 LIMPIEZA: restaurar título original al desmontar
    return () => {
      document.title = "React App";
    };
  }, [notas.length]); // ← Solo cuando la cantidad de notas cambia

  const agregarNota = () => {
    if (nuevaNota.trim() === "") return;

    const nota = {
      id: Date.now(),
      texto: nuevaNota,
      fecha: new Date().toLocaleString("es-ES"),
      completada: false,
    };

    setNotas([nota, ...notas]);
    setNuevaNota("");
  };

  const eliminarNota = (id) => {
    setNotas(notas.filter((nota) => nota.id !== id));
  };

  const toggleCompletada = (id) => {
    setNotas(
      notas.map((nota) =>
        nota.id === id ? { ...nota, completada: !nota.completada } : nota
      )
    );
  };

  const notasCompletadas = notas.filter((nota) => nota.completada).length;

  return (
    <Card className="shadow-sm">
      <Card.Header>
        <div className="d-flex justify-content-between align-items-center">
          <h5 className="mb-0">📝 Editor de Notas</h5>
          <div>
            <Badge bg="success" className="me-2">
              {notasCompletadas} completadas
            </Badge>
            <Badge bg="primary">{notas.length} total</Badge>
          </div>
        </div>
      </Card.Header>

      <Card.Body>
        {/* 📝 FORMULARIO PARA NUEVAS NOTAS */}
        <Form.Group className="mb-3">
          <Form.Label>Nueva nota:</Form.Label>
          <div className="d-flex gap-2">
            <Form.Control
              as="textarea"
              rows={2}
              value={nuevaNota}
              onChange={(e) => setNuevaNota(e.target.value)}
              placeholder="Escribe tu nota aquí..."
              onKeyPress={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  agregarNota();
                }
              }}
            />
            <Button
              variant="primary"
              onClick={agregarNota}
              disabled={nuevaNota.trim() === ""}
            >
              ➕ Agregar
            </Button>
          </div>
        </Form.Group>

        {/* 💾 INDICADOR DE GUARDADO */}
        {ultimaActualizacion && (
          <Alert variant="success" className="py-2 small">
            <strong>💾 Guardado automático:</strong>{" "}
            {ultimaActualizacion.toLocaleTimeString("es-ES")}
          </Alert>
        )}

        {/* 📋 LISTA DE NOTAS */}
        {notas.length === 0 ? (
          <Alert variant="info" className="text-center">
            📭 No hay notas. ¡Agrega la primera!
          </Alert>
        ) : (
          <ListGroup>
            {notas.map((nota) => (
              <ListGroup.Item
                key={nota.id}
                className="d-flex justify-content-between align-items-start"
              >
                <div className="flex-grow-1">
                  <div
                    className={
                      nota.completada
                        ? "text-decoration-line-through text-muted"
                        : ""
                    }
                    style={{ cursor: "pointer" }}
                    onClick={() => toggleCompletada(nota.id)}
                  >
                    {nota.texto}
                  </div>
                  <small className="text-muted">{nota.fecha}</small>
                </div>

                <div className="d-flex gap-1">
                  <Button
                    variant={
                      nota.completada ? "outline-warning" : "outline-success"
                    }
                    size="sm"
                    onClick={() => toggleCompletada(nota.id)}
                  >
                    {nota.completada ? "↶" : "✓"}
                  </Button>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => eliminarNota(nota.id)}
                  >
                    🗑️
                  </Button>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}

        {/* 💡 INFORMACIÓN SOBRE useEffect */}
        <Alert variant="info" className="mt-3 small">
          <strong>🎯 useEffect en este componente:</strong>
          <br />• <strong>Al montar:</strong> Carga notas desde localStorage
          <br />• <strong>Al cambiar notas:</strong> Guarda automáticamente
          <br />• <strong>Al cambiar cantidad:</strong> Actualiza título del
          documento
          <br />• <strong>Limpieza:</strong> Restaura título al desmontar
        </Alert>
      </Card.Body>
    </Card>
  );
}

export default EditorNotas;
