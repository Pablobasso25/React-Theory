// src/components/Clima.jsx
import React, { useState, useEffect } from "react";
import { Card, Button, Badge, Alert, Spinner, Row, Col } from "react-bootstrap";

function Clima() {
  const urlBase = "https://api.openweathermap.org/data/2.5/weather"; // URL base de la API del clima
  const API_KEY = "3aeee729ce3d796a60a9477c5af3f148"; // CLAVE API - En producción usar variables de entorno, ahora que es de prueba se puede utilizar la clave personal que te da la API
  /* const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY; */
  const [clima, setClima] = useState(null); // Guarda los datos del clima, inicia en null
  const [estaCargando, setEstaCargando] = useState(true); // Controla si está cargando datos, en el caso de que la api demore en devolver la respuesta o cuando ingresan mal una ciudad
  const [error, setError] = useState(null); // Guarda mensajes de error, null si no hay error
  const [ciudad, setCiudad] = useState("San Miguel de Tucumán"); // Ciudad seleccionada, "San Miguel de Tucumán" por defecto

  // EFECTO PRINCIPAL - Se ejecuta al montar el componente y cuando cambia la ciudad
  useEffect(() => {
    cargarClima(); // Carga los datos del clima apenas se monta el componente

    // Se configura un intervalo para actualizar automáticamente cada 5 minutos
    const intervalo = setInterval(() => {
      cargarClima(); // Llama a la función para cargar datos
    }, 5 * 60 * 1000); // 5 minutos convertidos e milisegundos

    // FUNCIÓN DE LIMPIEZA - Se ejecuta cuando el componente se desmonta
    return () => clearInterval(intervalo); // Limpia el intervalo
  }, [ciudad]); // Dependencia: se re-ejecuta cuando la ciudad cambia

  // FUNCIÓN PRINCIPAL - Carga los datos del clima desde la API
  const cargarClima = async () => {
    setEstaCargando(true); // Activa el estado de carga
    setError(null); // Limpia cualquier error anterior

    try {
      // SER REALIZA LA PETICIÓN A LA API
      const response = await fetch(
        `${urlBase}?q=${encodeURIComponent(
          ciudad
        )}&appid=${API_KEY}&units=metric&lang=es`
        // Parámetros:
        // q=ciudad - Ciudad a consultar (codificada para URL)
        // appid=API_KEY - Clave de autenticación
        // units=metric - Unidades métricas (Celsius)
        // lang=es - Idioma español para las descripciones
      );

      // VERIFICAMOS SI LA RESPUESTA ES EXITOSA
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`); // da error si la respuesta no es exitosa
      }
      // CONVIERTE LA RESPUESTA A FORMATO JSON
      const data = await response.json();
      // TRANSFORMA LOS DATOS DE LA API AL FORMATO DEL COMPONENTE
      const datosClima = {
        ciudad: data.name, // Nombre de la ciudad desde la API
        temperatura: Math.round(data.main.temp), // Temperatura redondeada
        descripcion: data.weather[0].description, // Descripción del clima
        humedad: data.main.humidity, // Porcentaje de humedad
        viento: Math.round(data.wind.speed * 3.6), // Velocidad del viento convertida de m/s a km/h
        direccionViento: data.wind.deg, // ← NUEVO: Dirección en grados
        rafagasViento: data.wind.gust ? Math.round(data.wind.gust * 3.6) : null, // ← NUEVO: Rafagas
        presion: data.main.pressure, // Presión atmosférica en hPa
        icono: obtenerIconoClima(data.weather[0].icon), // Emoji que corrresponde  al icono de la API
        sensacionTermica: Math.round(data.main.feels_like), // Sensación térmica redondeada gracias a Math.round
        pais: data.sys.country, // Código del país
      };

      // ACTUALIZAMOS LOS ESTADOS CON LOS NUEVOS DATOS
      setClima(datosClima); // Guarda los datos del clima en el estado
    } catch (err) {
      // MANEJO DE ERRORES - Diferentes mensajes según el tipo de error
      if (err.message.includes("404")) {
        setError(`No se encontró la ciudad "${ciudad}". Verifica el nombre.`);
      } else if (err.message.includes("401")) {
        setError("Error de autenticación. Verifica la configuración.");
      } else {
        setError("Error al cargar el clima. Intenta nuevamente.");
      }
    } finally {
      // BLOQUE FINAL - Siempre se ejecuta, haya éxito o error
      setEstaCargando(false); // Desactiva el estado de carga (quiere decir que si se muestra los datos de alguna ciudad, deja de mostrar el spinner con la carga de datos)
    }
  };

  // FUNCIÓN AUXILIAR - Convierte códigos de icono de la API a emojis
  const obtenerIconoClima = (iconCode) => {
    const iconMap = {
      "01d": "☀️", // Cielo despejado - día
      "01n": "🌙", // Cielo despejado - noche
      "02d": "⛅", // Pocas nubes - día
      "02n": "☁️", // Pocas nubes - noche
      "03d": "☁️", // Nubes dispersas - día
      "03n": "☁️", // Nubes dispersas - noche
      "04d": "☁️", // Nubes rotas - día
      "04n": "☁️", // Nubes rotas - noche
      "09d": "🌧️", // Lluvia - día
      "09n": "🌧️", // Lluvia - noche
      "10d": "🌦️", // Lluvia - día
      "10n": "🌧️", // Lluvia - noche
      "11d": "⛈️", // Tormenta - día
      "11n": "⛈️", // Tormenta - noche
      "13d": "❄️", // Nieve - día
      "13n": "❄️", // Nieve - noche
      "50d": "🌫️", // Niebla - día
      "50n": "🌫️", // Niebla - noche
    };
    return iconMap[iconCode] || "🌈"; // Retorna el emoji o "🌈" por defecto si no encuentra el código
  };

  // FUNCIÓN AUXILIAR - Determina el color del badge según la temperatura
  const obtenerColorTemperatura = (temp) => {
    if (temp < 10) return "info"; // Azul para temperaturas frías (<10°C)
    if (temp < 25) return "success"; // Verde para temperaturas templadas (10-24°C)
    if (temp < 35) return "warning"; // Amarillo para temperaturas cálidas (25-34°C)
    return "danger"; // Rojo para temperaturas muy altas (≥35°C)
  };

  // RENDERIZADO DEL COMPONENTE
  return (
    <Row className="justify-content-center">
      <Col md={4} className="mb-3 mt-4">
        <Card className=" shadow-sm">
          <Card.Header>
            <div className="d-flex justify-content-between align-items-center">
              <h5 className="mb-0">🌤️ Clima Actual</h5>
            </div>
          </Card.Header>
          {/* SELECTOR DE CIUDAD - Control para elegir la ciudad */}
          <Card.Body>
            <div className="mb-3">
              <label className="form-label">
                <strong>Ciudad:</strong>
              </label>
              <div className="d-flex gap-2">
                <select
                  className="form-select" // Clase  para seleccionar
                  value={ciudad} // Valor controlado por el estado
                  onChange={(e) => setCiudad(e.target.value)} // Se actualizael estado cuando cambia la selección
                  disabled={estaCargando} // Se deshabilita el spinner durante la carga
                >
                  {/* Opciones de ciudades disponibles: Tomas o Nahuel agreguen lasa cuidades de Argentina que faltan  */}
                  <option value="Buenos Aires">Buenos Aires</option>
                  <option value="Córdoba">Córdoba</option>
                  <option value="Rosario">Rosario</option>
                  <option value="Mendoza">Mendoza</option>
                  <option value="Bariloche">Bariloche</option>
                  <option value="San Miguel de Tucumán">
                    San Miguel de Tucumán
                  </option>
                </select>

                {/* BOTÓN DE ACTUALIZAR - Para recargar datos manualmente */}
                <Button
                  variant="outline-primary" //  botón con borde azul
                  onClick={cargarClima} // Ejecuta la función al hacer click
                  disabled={estaCargando} // Se deshabilita el spinner durante la carga
                >
                  {estaCargando ? <Spinner size="sm" /> : "🔄"}{" "}
                  {/* Muestra spinner si carga, sino icono */}
                </Button>
              </div>
            </div>

            {estaCargando && (
              <div className="text-center my-4">
                <Spinner animation="border" variant="primary" />
                <div className="mt-2 text-muted">
                  Cargando datos del clima...
                </div>
              </div>
            )}

            {/* ALERTA DE ERROR - Se muestra solo si hay error */}
            {error && (
              <Alert variant="danger">
                <strong>Error:</strong> {error}{" "}
                {/* Muestra el mensaje de error */}
                <div className="mt-2">
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={cargarClima}
                  >
                    Reintentar {/* Botón para intentar cargar nuevamente */}
                  </Button>
                </div>
              </Alert>
            )}

            {/* INFORMACIÓN DEL CLIMA - Se muestra cuando hay datos y no hay carga/error */}
            {!estaCargando && !error && clima && (
              <div>
                {/* SECCIÓN PRINCIPAL - Temperatura y información básica */}
                <div className="text-center mb-4">
                  <div style={{ fontSize: "4rem" }}>{clima.icono}</div>{" "}
                  {/* Icono grande del clima */}
                  <div className="display-4">
                    {" "}
                    {/* Tamaño de display grande para temperatura */}
                    <Badge bg={obtenerColorTemperatura(clima.temperatura)}>
                      {" "}
                      {/* Badge con color según temperatura */}
                      {clima.temperatura}°C {/* Temperatura en Celsius */}
                    </Badge>
                  </div>
                  <h4>
                    {clima.ciudad}, {clima.pais} {/* Ciudad y país */}
                  </h4>
                  <div className="text-muted text-capitalize">
                    {clima.descripcion}
                  </div>
                  <div className="small text-muted mt-1">
                    Sensación térmica: {clima.sensacionTermica}°C{" "}
                    {/* Sensación térmica */}
                  </div>
                </div>

                {/* DATOS ADICIONALES - métricas del clima */}
                <Row className="text-center">
                  {/* HUMEDAD */}
                  <Col xs={6} className="mb-3">
                    <div className="border rounded p-2">
                      <div>💧 Humedad</div>
                      <div className="h5 mb-0">{clima.humedad}%</div>
                    </div>
                  </Col>
                  {/* VIENTO */}
                  <Col xs={6} className="mb-3">
                    <div className="border rounded p-2">
                      <div>💨 Viento</div>
                      <div className="h5 mb-0">{clima.viento} km/h</div>
                    </div>
                  </Col>
                  {/* PRESIÓN ATMOSFÉRICA */}
                  <Col xs={6}>
                    <div className="border rounded p-2">
                      <div>📊 Presión</div>
                      <div className="h5 mb-0">{clima.presion} hPa</div>
                    </div>
                  </Col>
                  {/* INFORMACIÓN DE ACTUALIZACIÓN */}
                  <Col xs={6}>
                    <div className="border rounded p-2">
                      <div>🔄 Actualización</div>
                      <div className="small">Cada 5 min</div>{" "}
                      {/* Frecuencia de actualización */}
                    </div>
                  </Col>
                </Row>
              </div>
            )}
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}

export default Clima;
