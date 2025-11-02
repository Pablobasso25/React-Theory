// src/hooks/useDebounce.js
import { useState, useEffect } from "react";

// 🎯 CUSTOM HOOK: Debounce para búsquedas
function useDebounce(valor, delay = 500) {
  const [valorDebounce, setValorDebounce] = useState(valor);

  useEffect(() => {
    const handler = setTimeout(() => {
      setValorDebounce(valor);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [valor, delay]);

  return valorDebounce;
}

export default useDebounce;
