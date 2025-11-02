// src/hooks/useToggle.js
import { useState, useCallback } from "react";

// 🎯 CUSTOM HOOK: Alternar entre true/false
function useToggle(valorInicial = false) {
  const [valor, setValor] = useState(valorInicial);

  // 🎯 useCallback para memoizar la función
  const toggle = useCallback(() => setValor((v) => !v), []);
  const setTrue = useCallback(() => setValor(true), []);
  const setFalse = useCallback(() => setValor(false), []);

  return {
    valor,
    toggle,
    setTrue,
    setFalse,
    setValor,
  };
}

export default useToggle;
