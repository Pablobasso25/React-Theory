// src/hooks/useLocalStorage.js
import { useState, useEffect } from 'react';

// 🎯 CUSTOM HOOK: Manejo automático de localStorage
function useLocalStorage(key, valorInicial) {
  // 🎯 Estado para el valor actual
  const [valor, setValor] = useState(() => {
    try {
      // 1. Intentar obtener el valor de localStorage
      const item = window.localStorage.getItem(key);
      // 2. Si existe, parsearlo, sino usar valorInicial
      return item ? JSON.parse(item) : valorInicial;
    } catch (error) {
      console.error(`Error leyendo localStorage key "${key}":`, error);
      return valorInicial;
    }
  });

  // 🎯 useEffect para guardar en localStorage cuando el valor cambia
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(valor));
    } catch (error) {
      console.error(`Error guardando en localStorage key "${key}":`, error);
    }
  }, [key, valor]);

  return [valor, setValor];
}

export default useLocalStorage;