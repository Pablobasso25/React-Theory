// src/components/Clima.jsx
import React, { useState, useEffect } from "react";
import { Card, Button, Badge, Alert, Spinner, Row, Col } from "react-bootstrap";
// ✅ IMPORTAR ESTILOS DE BOOTSTRAP
import "bootstrap/dist/css/bootstrap.min.css";

function Clima() {
  const urlBase = "https://api.openweathermap.org/data/2.5/weather";
  const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

  const [clima, setClima] = useState(null);
  const [estaCargando, setEstaCargando] = useState(true);
  const [error, setError] = useState(null);
  const [ultimaActualizacion, setUltimaActualizacion] = useState(null);
  const [ciudad, setCiudad] = useState("Buenos Aires");

  useEffect(() => {
    cargarClima();

    const intervalo = setInterval(() => {
      cargarClima();
    }, 5 * 60 * 1000);

    return () => clearInterval(intervalo);
  }, [ciudad]);

  const cargarClima = async () => {
    setEstaCargando(true);
    setError(null);

    try {
      const response = await fetch(
        `${urlBase}?q=${encodeURIComponent(
          ciudad
        )}&appid=${API_KEY}&units=metric&lang=es`
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();

      const datosClima = {
        ciudad: data.name,
        temperatura: Math.round(data.main.temp),
        descripcion: data.weather[0].description,
        humedad: data.main.humidity,
        viento: Math.round(data.wind.speed * 3.6),
        presion: data.main.pressure,
        icono: obtenerIconoClima(data.weather[0].icon),
        sensacionTermica: Math.round(data.main.feels_like),
        pais: data.sys.country,
      };

      setClima(datosClima);
      setUltimaActualizacion(new Date());
    } catch (err) {
      if (err.message.includes("404")) {
        setError(`No se encontró la ciudad "${ciudad}". Verifica el nombre.`);
      } else if (err.message.includes("401")) {
        setError("Error de autenticación. Verifica la configuración.");
      } else {
        setError("Error al cargar el clima. Intenta nuevamente.");
      }
    } finally {
      setEstaCargando(false);
    }
  };

  const obtenerIconoClima = (iconCode) => {
    const iconMap = {
      "01d": "☀️",
      "01n": "🌙",
      "02d": "⛅",
      "02n": "☁️",
      "03d": "☁️",
      "03n": "☁️",
      "04d": "☁️",
      "04n": "☁️",
      "09d": "🌧️",
      "09n": "🌧️",
      "10d": "🌦️",
      "10n": "🌧️",
      "11d": "⛈️",
      "11n": "⛈️",
      "13d": "❄️",
      "13n": "❄️",
      "50d": "🌫️",
      "50n": "🌫️",
    };
    return iconMap[iconCode] || "🌈";
  };

  const obtenerColorTemperatura = (temp) => {
    if (temp < 10) return "info";
    if (temp < 25) return "success";
    if (temp < 35) return "warning";
    return "danger";
  };

  const formatearFecha = (fecha) => {
    return fecha ? fecha.toLocaleTimeString("es-ES") : "Nunca";
  };

  return (
    <Card className="shadow-sm ">
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

        {!estaCargando && !error && clima && (
          <div>
            <div className="text-center mb-4">
              <div style={{ fontSize: "4rem" }}>{clima.icono}</div>
              <div className="display-4">
                <Badge bg={obtenerColorTemperatura(clima.temperatura)}>
                  {clima.temperatura}°C
                </Badge>
              </div>
              <h4>
                {clima.ciudad}, {clima.pais}
              </h4>
              <div className="text-muted text-capitalize">
                {clima.descripcion}
              </div>
              <div className="small text-muted mt-1">
                Sensación térmica: {clima.sensacionTermica}°C
              </div>
            </div>

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
      </Card.Body>
    </Card>
  );
}

export default Clima;
