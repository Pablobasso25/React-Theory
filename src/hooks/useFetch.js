// src/hooks/useFetch.js
import { useState, useEffect } from "react";

// 🎯 CUSTOM HOOK: Manejo de peticiones HTTP
function useFetch(url, opciones = {}) {
  const [datos, setDatos] = useState(null);
  const [estaCargando, setEstaCargando] = useState(true);
  const [error, setError] = useState(null);

  // 🎯 useEffect para realizar la petición
  useEffect(() => {
    const controlador = new AbortController();
    const { signal } = controlador;

    const fetchDatos = async () => {
      setEstaCargando(true);
      setError(null);

      try {
        const respuesta = await fetch(url, { ...opciones, signal });

        if (!respuesta.ok) {
          throw new Error(`Error ${respuesta.status}: ${respuesta.statusText}`);
        }

        const datos = await respuesta.json();
        setDatos(datos);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        setEstaCargando(false);
      }
    };

    fetchDatos();

    // 🎯 Limpieza: cancelar petición si el componente se desmonta
    return () => controlador.abort();
  }, [url]); // ← Se re-ejecuta cuando la URL cambia

  // 🎯 Función para re-fetch manual
  const refetch = async () => {
    setEstaCargando(true);
    setError(null);

    try {
      const respuesta = await fetch(url, opciones);
      const datos = await respuesta.json();
      setDatos(datos);
    } catch (err) {
      setError(err.message);
    } finally {
      setEstaCargando(false);
    }
  };

  return {
    datos,
    estaCargando,
    error,
    refetch,
  };
}

export default useFetch;
