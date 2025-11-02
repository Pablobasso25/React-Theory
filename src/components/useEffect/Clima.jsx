// src/components/Clima.jsx
import React, { useState, useEffect } from "react";
import { Card, Button, Badge, Alert, Spinner, Row, Col } from "react-bootstrap";

function Clima() {
  const [clima, setClima] = useState(null);
  const [estaCargando, setEstaCargando] = useState(true);
  const [error, setError] = useState(null);
  const [ultimaActualizacion, setUltimaActualizacion] = useState(null);
  const [ciudad, setCiudad] = useState("Buenos Aires");

  // 🎯 useEffect 1: CARGAR CLIMA AL MONTAR y cada 5 minutos
  useEffect(() => {
    cargarClima();

    // 🎯 INTERVALO para actualizar cada 5 minutos
    const intervalo = setInterval(() => {
      console.log("🔄 Actualizando clima automáticamente...");
      cargarClima();
    }, 5 * 60 * 1000); // 5 minutos

    // 🎯 LIMPIEZA del intervalo al desmontar
    return () => {
      clearInterval(intervalo);
      console.log("🧹 Intervalo de clima limpiado");
    };
  }, [ciudad]); // ← Se re-ejecuta cuando la ciudad cambia

  // 🎯 FUNCIÓN PARA CARGAR CLIMA
  const cargarClima = async () => {
    setEstaCargando(true);
    setError(null);

    try {
      // 🎯 API de clima (OpenWeatherMap) - Versión simulada
      // En una app real, usarías: https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=TU_API_KEY

      // Simulamos una llamada a API con datos de ejemplo
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // 🎯 DATOS SIMULADOS (en una app real, estos vendrían de la API)
      const datosClima = {
        ciudad: ciudad,
        temperatura: Math.round(Math.random() * 35 + 5), // 5-40°C
        descripcion: ["Soleado", "Parcialmente nublado", "Nublado", "Lluvioso"][
          Math.floor(Math.random() * 4)
        ],
        humedad: Math.round(Math.random() * 50 + 30), // 30-80%
        viento: Math.round(Math.random() * 30 + 5), // 5-35 km/h
        presion: Math.round(Math.random() * 50 + 1000), // 1000-1050 hPa
        icono: "☀️",
      };

      // Determinar icono según descripción
      if (datosClima.descripcion.includes("Lluvioso")) datosClima.icono = "🌧️";
      else if (datosClima.descripcion.includes("Nublado"))
        datosClima.icono = "☁️";
      else if (datosClima.descripcion.includes("Parcialmente"))
        datosClima.icono = "⛅";

      setClima(datosClima);
      setUltimaActualizacion(new Date());
      console.log("✅ Clima cargado:", datosClima);
    } catch (err) {
      setError("Error al cargar el clima. Intenta nuevamente.");
      console.error("❌ Error cargando clima:", err);
    } finally {
      setEstaCargando(false);
    }
  };

  // 🎯 OBTENER COLOR según temperatura
  const obtenerColorTemperatura = (temp) => {
    if (temp < 10) return "info"; // Azul - Frío
    if (temp < 25) return "success"; // Verde - Templado
    if (temp < 35) return "warning"; // Amarillo - Calor
    return "danger"; // Rojo - Mucho calor
  };

  // 🎯 FORMATEAR FECHA
  const formatearFecha = (fecha) => {
    return fecha ? fecha.toLocaleTimeString("es-ES") : "Nunca";
  };

  return (
    <Card className="shadow-sm">
      <Card.Header>
        <div className="d-flex justify-content-between align-items-center">
          <h5 className="mb-0">🌤️ Clima Actual</h5>
          {ultimaActualizacion && (
            <Badge bg="secondary" className="small">
              Actualizado: {formatearFecha(ultimaActualizacion)}
            </Badge>
          )}
        </div>
      </Card.Header>

      <Card.Body>
        {/* 🎯 SELECTOR DE CIUDAD */}
        <div className="mb-3">
          <label className="form-label">
            <strong>Ciudad:</strong>
          </label>
          <div className="d-flex gap-2">
            <select
              className="form-select"
              value={ciudad}
              onChange={(e) => setCiudad(e.target.value)}
              disabled={estaCargando}
            >
              <option value="Buenos Aires">Buenos Aires</option>
              <option value="Córdoba">Córdoba</option>
              <option value="Rosario">Rosario</option>
              <option value="Mendoza">Mendoza</option>
              <option value="Bariloche">Bariloche</option>
            </select>
            <Button
              variant="outline-primary"
              onClick={cargarClima}
              disabled={estaCargando}
            >
              {estaCargando ? <Spinner size="sm" /> : "🔄"}
            </Button>
          </div>
        </div>

        {/* 🎯 ESTADOS DE CARGA Y ERROR */}
        {estaCargando && (
          <div className="text-center my-4">
            <Spinner animation="border" variant="primary" />
            <div className="mt-2 text-muted">Cargando datos del clima...</div>
          </div>
        )}

        {error && (
          <Alert variant="danger">
            <strong>Error:</strong> {error}
            <div className="mt-2">
              <Button variant="outline-danger" size="sm" onClick={cargarClima}>
                Reintentar
              </Button>
            </div>
          </Alert>
        )}

        {/* 🎯 INFORMACIÓN DEL CLIMA */}
        {!estaCargando && !error && clima && (
          <div>
            {/* 🌡️ TEMPERATURA PRINCIPAL */}
            <div className="text-center mb-4">
              <div style={{ fontSize: "4rem" }}>{clima.icono}</div>
              <div className="display-4">
                <Badge bg={obtenerColorTemperatura(clima.temperatura)}>
                  {clima.temperatura}°C
                </Badge>
              </div>
              <h4>{clima.ciudad}</h4>
              <div className="text-muted">{clima.descripcion}</div>
            </div>

            {/* 📊 DATOS ADICIONALES */}
            <Row className="text-center">
              <Col xs={6} className="mb-3">
                <div className="border rounded p-2">
                  <div>💧 Humedad</div>
                  <div className="h5 mb-0">{clima.humedad}%</div>
                </div>
              </Col>
              <Col xs={6} className="mb-3">
                <div className="border rounded p-2">
                  <div>💨 Viento</div>
                  <div className="h5 mb-0">{clima.viento} km/h</div>
                </div>
              </Col>
              <Col xs={6}>
                <div className="border rounded p-2">
                  <div>📊 Presión</div>
                  <div className="h5 mb-0">{clima.presion} hPa</div>
                </div>
              </Col>
              <Col xs={6}>
                <div className="border rounded p-2">
                  <div>🔄 Actualización</div>
                  <div className="small">Cada 5 min</div>
                </div>
              </Col>
            </Row>
          </div>
        )}

        {/* 💡 INFORMACIÓN SOBRE useEffect */}
        <Alert variant="info" className="mt-3 small">
          <strong>🎯 useEffect en este componente:</strong>
          <br />• <strong>Al montar/cambiar ciudad:</strong> Carga datos del
          clima
          <br />• <strong>Intervalo:</strong> Actualiza cada 5 minutos
          automáticamente
          <br />• <strong>Limpieza:</strong> Limpia intervalo al desmontar
        </Alert>
      </Card.Body>
    </Card>
  );
}

export default Clima;
