import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";

import App from "./App.jsx";
import App2 from "./App2.jsx";
import Crud from "./Crud.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
    <App2 />
    <Crud />
  </StrictMode>
);
