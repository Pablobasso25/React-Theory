// src/components/ListaTareas.jsx
import React, { useState } from "react";
import { Card, Form, Button, ListGroup, Badge, Alert } from "react-bootstrap";

function ListaTareas() {
  // 🎯 ESTADO PARA LAS TAREAS
  const [tareas, setTareas] = useState([
    { id: 1, texto: "Aprender React", completada: true },
    { id: 2, texto: "Practicar useState", completada: false },
    { id: 3, texto: "Estudiar renderizado condicional", completada: false },
  ]);

  const [nuevaTarea, setNuevaTarea] = useState("");
  const [filtro, setFiltro] = useState("todas"); // 'todas', 'pendientes', 'completadas'

  // 🎯 AGREGAR NUEVA TAREA
  const agregarTarea = (e) => {
    e.preventDefault();
    if (nuevaTarea.trim() === "") return;

    const tarea = {
      id: Date.now(), // 🎯 Key única basada en timestamp
      texto: nuevaTarea,
      completada: false,
    };

    setTareas([...tareas, tarea]);
    setNuevaTarea("");
  };

  // 🎯 CAMBIAR ESTADO DE TAREA
  const toggleTarea = (id) => {
    setTareas(
      tareas.map((tarea) =>
        tarea.id === id ? { ...tarea, completada: !tarea.completada } : tarea
      )
    );
  };

  // 🎯 ELIMINAR TAREA
  const eliminarTarea = (id) => {
    setTareas(tareas.filter((tarea) => tarea.id !== id));
  };

  // 🎯 FILTRAR TAREAS
  const tareasFiltradas = tareas.filter((tarea) => {
    if (filtro === "pendientes") return !tarea.completada;
    if (filtro === "completadas") return tarea.completada;
    return true; // 'todas'
  });

  // 🎯 CONTADORES
  const tareasCompletadas = tareas.filter((t) => t.completada).length;
  const tareasPendientes = tareas.filter((t) => !t.completada).length;

  return (
    <Card className="shadow-sm">
      <Card.Header>
        <div className="d-flex justify-content-between align-items-center">
          <h5 className="mb-0">✅ Lista de Tareas</h5>
          <div>
            <Badge bg="success" className="me-1">
              {tareasCompletadas} completadas
            </Badge>
            <Badge bg="warning">{tareasPendientes} pendientes</Badge>
          </div>
        </div>
      </Card.Header>

      <Card.Body>
        {/* 📝 FORMULARIO PARA AGREGAR TAREAS */}
        <Form onSubmit={agregarTarea} className="mb-3">
          <div className="d-flex gap-2">
            <Form.Control
              type="text"
              value={nuevaTarea}
              onChange={(e) => setNuevaTarea(e.target.value)}
              placeholder="Escribe una nueva tarea..."
            />
            <Button type="submit" variant="primary">
              ➕ Agregar
            </Button>
          </div>
        </Form>

        {/* 🎯 FILTROS */}
        <div className="mb-3">
          <strong>Filtrar:</strong>
          <div className="mt-1">
            <Button
              size="sm"
              variant={filtro === "todas" ? "primary" : "outline-primary"}
              onClick={() => setFiltro("todas")}
              className="me-1"
            >
              Todas ({tareas.length})
            </Button>
            <Button
              size="sm"
              variant={filtro === "pendientes" ? "warning" : "outline-warning"}
              onClick={() => setFiltro("pendientes")}
              className="me-1"
            >
              Pendientes ({tareasPendientes})
            </Button>
            <Button
              size="sm"
              variant={filtro === "completadas" ? "success" : "outline-success"}
              onClick={() => setFiltro("completadas")}
            >
              Completadas ({tareasCompletadas})
            </Button>
          </div>
        </div>

        {/* 📋 LISTA DE TAREAS */}
        {tareasFiltradas.length === 0 ? (
          // 🎯 RENDERIZADO CONDICIONAL - LISTA VACÍA
          <Alert variant="info" className="text-center">
            {filtro === "completadas"
              ? "🎉 ¡No hay tareas completadas!"
              : filtro === "pendientes"
              ? "✅ ¡No hay tareas pendientes!"
              : "📝 ¡No hay tareas! Agrega una nueva."}
          </Alert>
        ) : (
          <ListGroup>
            {tareasFiltradas.map((tarea) => (
              // 🎯 IMPORTANTE: Key única para cada elemento
              <ListGroup.Item
                key={tarea.id}
                className="d-flex justify-content-between align-items-center"
              >
                <div className="d-flex align-items-center">
                  <Form.Check
                    type="checkbox"
                    checked={tarea.completada}
                    onChange={() => toggleTarea(tarea.id)}
                    className="me-2"
                  />
                  <span
                    style={{
                      textDecoration: tarea.completada
                        ? "line-through"
                        : "none",
                      opacity: tarea.completada ? 0.6 : 1,
                    }}
                  >
                    {tarea.texto}
                  </span>
                </div>

                <Button
                  size="sm"
                  variant="outline-danger"
                  onClick={() => eliminarTarea(tarea.id)}
                >
                  🗑️
                </Button>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}

        {/* 📊 ESTADÍSTICAS */}
        {tareas.length > 0 && (
          <Alert variant="light" className="mt-3 small">
            <strong>📈 Progreso:</strong>
            {tareasCompletadas > 0 &&
              ` ${Math.round(
                (tareasCompletadas / tareas.length) * 100
              )}% completado`}
            {tareasCompletadas === 0 && " ¡Comienza a completar tareas!"}
          </Alert>
        )}
      </Card.Body>
    </Card>
  );
}

export default ListaTareas;
