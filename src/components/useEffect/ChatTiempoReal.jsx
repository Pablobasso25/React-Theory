// src/components/ChatTiempoReal.jsx
import React, { useState, useEffect, useRef } from "react";
import {
  Card,
  Form,
  Button,
  Alert,
  Badge,
  ListGroup,
  Spinner,
} from "react-bootstrap";

function ChatTiempoReal() {
  const [mensajes, setMensajes] = useState([]);
  const [nuevoMensaje, setNuevoMensaje] = useState("");
  const [estaConectado, setEstaConectado] = useState(false);
  const [estaCargando, setEstaCargando] = useState(false);
  const [usuario, setUsuario] = useState(
    "Usuario" + Math.floor(Math.random() * 1000)
  );
  const [error, setError] = useState(null);

  // 🎯 useRef para mantener referencia al último mensaje
  const ultimoMensajeRef = useRef(null);

  // 🎯 useEffect 1: SIMULAR CONEXIÓN WEBSOCKET al montar
  useEffect(() => {
    console.log("🔌 Conectando al chat...");
    setEstaCargando(true);

    // Simular conexión WebSocket
    const timeout = setTimeout(() => {
      setEstaConectado(true);
      setEstaCargando(false);
      console.log("✅ Conectado al chat");

      // Mensaje de bienvenida automático
      agregarMensajeSistema("🤖 ¡Bienvenido al chat! Estás conectado.");
    }, 2000);

    // 🎯 LIMPIEZA: desconectar al desmontar
    return () => {
      clearTimeout(timeout);
      setEstaConectado(false);
      console.log("🔌 Desconectado del chat");
    };
  }, []); // ← Solo al montar/desmontar

  // 🎯 useEffect 2: SIMULAR MENSAJES EN TIEMPO REAL
  useEffect(() => {
    if (!estaConectado) return;

    // Simular recepción de mensajes de otros usuarios
    const intervaloMensajes = setInterval(() => {
      if (Math.random() > 0.7) {
        // 30% de probabilidad cada 5 segundos
        const usuarios = ["Ana", "Carlos", "María", "Pedro", "Laura"];
        const usuarioAleatorio =
          usuarios[Math.floor(Math.random() * usuarios.length)];
        const mensajesAleatorios = [
          "¡Hola a todos! 👋",
          "¿Cómo están?",
          "¡Este chat está genial! 🚀",
          "Alguien quiere jugar? 🎮",
          "¡Buen día! ☀️",
          "¿Vieron la última noticia?",
          "¡Feliz viernes! 🎉",
        ];

        const mensajeAleatorio =
          mensajesAleatorios[
            Math.floor(Math.random() * mensajesAleatorios.length)
          ];
        agregarMensaje(usuarioAleatorio, mensajeAleatorio, false);
      }
    }, 5000);

    return () => clearInterval(intervaloMensajes);
  }, [estaConectado]);

  // 🎯 useEffect 3: SCROLL AUTOMÁTICO AL NUEVO MENSAJE
  useEffect(() => {
    if (ultimoMensajeRef.current) {
      ultimoMensajeRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [mensajes]); // ← Se ejecuta cuando hay nuevos mensajes

  // 🎯 FUNCIONES DEL CHAT
  const agregarMensaje = (autor, texto, esMio = true) => {
    const mensaje = {
      id: Date.now() + Math.random(),
      autor,
      texto,
      timestamp: new Date(),
      esMio,
    };

    setMensajes((prev) => [...prev, mensaje]);
  };

  const agregarMensajeSistema = (texto) => {
    agregarMensaje("Sistema", texto, false);
  };

  const enviarMensaje = (e) => {
    e.preventDefault();
    if (nuevoMensaje.trim() === "" || !estaConectado) return;

    agregarMensaje(usuario, nuevoMensaje, true);
    setNuevoMensaje("");

    // Simular "escribiendo..." de otros usuarios
    setTimeout(() => {
      if (Math.random() > 0.5) {
        agregarMensajeSistema("📝 Alguien está escribiendo...");
      }
    }, 1000);
  };

  const desconectar = () => {
    setEstaConectado(false);
    agregarMensajeSistema("🔌 Te has desconectado del chat");
  };

  const conectar = () => {
    setEstaCargando(true);
    setTimeout(() => {
      setEstaConectado(true);
      setEstaCargando(false);
      agregarMensajeSistema("✅ Reconectado al chat");
    }, 1500);
  };

  // 🎯 FORMATEAR HORA
  const formatearHora = (fecha) => {
    return fecha.toLocaleTimeString("es-ES", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Card className="shadow-sm">
      <Card.Header>
        <div className="d-flex justify-content-between align-items-center">
          <h5 className="mb-0">💬 Chat en Tiempo Real</h5>
          <div>
            <Badge bg={estaConectado ? "success" : "danger"}>
              {estaConectado ? "🟢 Conectado" : "🔴 Desconectado"}
            </Badge>
            <Badge bg="primary" className="ms-2">
              {mensajes.length}
            </Badge>
          </div>
        </div>
      </Card.Header>

      <Card.Body className="d-flex flex-column" style={{ height: "500px" }}>
        {/* 🎯 ESTADO DE CONEXIÓN */}
        {estaCargando && (
          <div className="text-center my-3">
            <Spinner animation="border" size="sm" className="me-2" />
            <span className="text-muted">Conectando al chat...</span>
          </div>
        )}

        {error && (
          <Alert variant="danger" className="py-2">
            <strong>Error:</strong> {error}
          </Alert>
        )}

        {/* 🎯 CONTROLES DE CONEXIÓN */}
        <div className="d-flex gap-2 mb-3">
          {estaConectado ? (
            <Button variant="outline-danger" size="sm" onClick={desconectar}>
              🔌 Desconectar
            </Button>
          ) : (
            <Button
              variant="outline-success"
              size="sm"
              onClick={conectar}
              disabled={estaCargando}
            >
              🔌 Conectar
            </Button>
          )}

          <Form.Select
            size="sm"
            style={{ width: "auto" }}
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            disabled={estaConectado}
          >
            <option value={`Usuario${Math.floor(Math.random() * 1000)}`}>
              Usuario Aleatorio
            </option>
            <option value="Ana">Ana</option>
            <option value="Carlos">Carlos</option>
            <option value="María">María</option>
            <option value="Pedro">Pedro</option>
          </Form.Select>
        </div>

        {/* 📱 AREA DE MENSAJES */}
        <div className="flex-grow-1 overflow-auto mb-3 border rounded p-2 bg-light">
          {mensajes.length === 0 ? (
            <div className="text-center text-muted my-4">
              {estaConectado
                ? "💬 Escribe el primer mensaje..."
                : "🔌 Conéctate para chatear"}
            </div>
          ) : (
            <ListGroup variant="flush">
              {mensajes.map((mensaje, index) => (
                <div
                  key={mensaje.id}
                  ref={index === mensajes.length - 1 ? ultimoMensajeRef : null}
                >
                  {mensaje.autor === "Sistema" ? (
                    // 🎯 MENSAJE DEL SISTEMA
                    <div className="text-center text-muted small my-1">
                      {mensaje.texto}
                    </div>
                  ) : (
                    // 🎯 MENSAJE DE USUARIO
                    <ListGroup.Item className="border-0 px-0 py-1">
                      <div
                        className={`d-flex ${
                          mensaje.esMio
                            ? "justify-content-end"
                            : "justify-content-start"
                        }`}
                      >
                        <div
                          className={`rounded p-2 ${
                            mensaje.esMio
                              ? "bg-primary text-white"
                              : "bg-white border"
                          }`}
                          style={{ maxWidth: "70%" }}
                        >
                          <div className="small fw-bold">
                            {mensaje.autor} {mensaje.esMio && "(Tú)"}
                          </div>
                          <div className="mb-1">{mensaje.texto}</div>
                          <div className="small opacity-75">
                            {formatearHora(mensaje.timestamp)}
                          </div>
                        </div>
                      </div>
                    </ListGroup.Item>
                  )}
                </div>
              ))}
            </ListGroup>
          )}
        </div>

        {/* 📝 FORMULARIO DE MENSAJE */}
        <Form onSubmit={enviarMensaje} className="mt-auto">
          <div className="d-flex gap-2">
            <Form.Control
              type="text"
              value={nuevoMensaje}
              onChange={(e) => setNuevoMensaje(e.target.value)}
              placeholder={
                estaConectado
                  ? "Escribe un mensaje..."
                  : "Conéctate para chatear"
              }
              disabled={!estaConectado || estaCargando}
            />
            <Button
              type="submit"
              variant="primary"
              disabled={
                !estaConectado || nuevoMensaje.trim() === "" || estaCargando
              }
            >
              📤
            </Button>
          </div>
        </Form>

        {/* 💡 INFORMACIÓN SOBRE useEffect */}
        <Alert variant="info" className="mt-3 small">
          <strong>🎯 useEffect en este componente:</strong>
          <br />• <strong>Al montar:</strong> Simula conexión WebSocket
          <br />• <strong>Al conectar:</strong> Recibe mensajes en tiempo real
          <br />• <strong>Al recibir mensajes:</strong> Scroll automático
          <br />• <strong>Limpieza:</strong> Desconexión automática
        </Alert>
      </Card.Body>
    </Card>
  );
}

export default ChatTiempoReal;
