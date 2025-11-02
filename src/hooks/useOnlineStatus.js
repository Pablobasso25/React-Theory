// src/hooks/useOnlineStatus.js
import { useState, useEffect } from "react";

// 🎯 CUSTOM HOOK: Estado de conexión a internet
function useOnlineStatus() {
  const [estaOnline, setEstaOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setEstaOnline(true);
    const handleOffline = () => setEstaOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return estaOnline;
}

export default useOnlineStatus;
