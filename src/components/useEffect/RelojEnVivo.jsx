// src/components/RelojEnVivo.jsx
import React, { useState, useEffect } from "react";
import { Card, Badge, Button } from "react-bootstrap";

function RelojEnVivo() {
  const [hora, setHora] = useState(new Date());
  const [estaActivo, setEstaActivo] = useState(true);
  const [contador, setContador] = useState(0);

  // 🎯 useEffect 1: SIN DEPENDENCIAS - Se ejecuta solo al montar
  useEffect(() => {
    console.log("⏰ Componente Reloj montado");

    // Limpieza cuando el componente se desmonta
    return () => {
      console.log("⏰ Componente Reloj desmontado");
    };
  }, []); // ← Array vacío = solo al montar/desmontar

  // 🎯 useEffect 2: CON DEPENDENCIA - Controla el reloj
  useEffect(() => {
    let intervalo;

    if (estaActivo) {
      intervalo = setInterval(() => {
        setHora(new Date());
        setContador((prev) => prev + 1);
      }, 1000);
    }

    // 🎯 FUNCIÓN DE LIMPIEZA - Importante para setInterval
    return () => {
      if (intervalo) {
        clearInterval(intervalo);
        console.log("🔄 Intervalo limpiado");
      }
    };
  }, [estaActivo]); // ← Se re-ejecuta cuando estaActivo cambia

  // 🎯 useEffect 3: CON MÚLTIPLES DEPENDENCIAS
  useEffect(() => {
    console.log(`🕒 Hora actualizada: ${hora.toLocaleTimeString()}`);
  }, [hora]); // ← Se ejecuta cuando la hora cambia

  const formatearHora = (fecha) => {
    return fecha.toLocaleTimeString("es-ES", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  return (
    <Card className="shadow-sm">
      <Card.Header>
        <div className="d-flex justify-content-between align-items-center">
          <h5 className="mb-0">⏰ Reloj en Vivo</h5>
          <Badge bg={estaActivo ? "success" : "secondary"}>
            {estaActivo ? "ACTIVO" : "PAUSADO"}
          </Badge>
        </div>
      </Card.Header>

      <Card.Body className="text-center">
        {/* 🕒 HORA ACTUAL */}
        <div className="display-4 mb-3 font-monospace">
          {formatearHora(hora)}
        </div>

        {/* 📊 INFORMACIÓN */}
        <div className="mb-3">
          <Badge bg="primary" className="me-2">
            Actualizaciones: {contador}
          </Badge>
          <Badge bg="info">Día: {hora.toLocaleDateString("es-ES")}</Badge>
        </div>

        {/* 🎯 CONTROLES */}
        <div className="d-grid gap-2 d-md-flex justify-content-center">
          <Button
            variant={estaActivo ? "warning" : "success"}
            onClick={() => setEstaActivo(!estaActivo)}
          >
            {estaActivo ? "⏸️ Pausar" : "▶️ Reanudar"}
          </Button>

          <Button variant="outline-secondary" onClick={() => setContador(0)}>
            🔄 Reiniciar Contador
          </Button>
        </div>

        {/* 💡 INFORMACIÓN */}
        <div className="mt-3 small text-muted">
          <strong>useEffect en acción:</strong>
          <br />
          • Se ejecuta al montar (console.log)
          <br />
          • Intervalo que se limpia automáticamente
          <br />• Dependencia en <code>estaActivo</code>
        </div>
      </Card.Body>
    </Card>
  );
}

export default RelojEnVivo;
