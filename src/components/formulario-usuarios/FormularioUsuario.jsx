// Importamos React y el hook useState
/* import React, { useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";




const FormularioUsuario = () => {
    // Estado para los campos del formulario
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");



  return (
    <div>FormularioUsuario</div>
  )
}

export default FormularioUsuario */

// Importamos React y el hook useState
import React, { useState } from "react";

// Importamos componentes de React Bootstrap
import { Form, Button, Card, Alert } from "react-bootstrap";

// Componente funcional
function FormularioUsuario() {
  // Estado para los campos del formulario
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");

  /* • errores es el valor actual del estado (por defecto, un objeto vacío).
    • setErrores es la función que actualiza ese estado
    • useState({}) significa que el estado inicial es un objeto vacío

*/
  const [errores, setErrores] = useState({});

  // Estado para mostrar los datos enviados
  const [usuarioCreado, setUsuarioCreado] = useState(null);

  // Función que se ejecuta al enviar el formulario
  const manejarEnvio = (e) => {
    e.preventDefault();

    //Es un objeto temporal que usamos para acumular los errores detectados en los inputs del formulario.
    const nuevosErrores = {};

    if (!nombre.trim()) {
      nuevosErrores.nombre = "El nombre es obligatorio";
    }

    if (!correo.trim()) {
      nuevosErrores.correo = "El correo es obligatorio";
    } else if (!/\S+@\S+\.\S+/.test(correo)) {
      nuevosErrores.correo = "El formato del correo no es válido";
    }
    // si detecta algun error pasa esto:
    if (Object.keys(nuevosErrores).length > 0) {
      setErrores(nuevosErrores); // Mostramos los errores en pantalla
      setUsuarioCreado(null); // Ocultamos el mensaje de éxito (si lo había)
    } else {
      setErrores({}); // Limpiamos los errores
      setUsuarioCreado({ nombre, correo }); // Guardamos los datos para mostrar el mensaje
      setNombre(""); // Limpiamos el campo nombre
      setCorreo(""); // Limpiamos el campo correo
    }
  };

  return (
    <>
      <Card className="mt-4 shadow-sm">
        <Card.Body>
          <Card.Title>📋 Formulario de Usuario</Card.Title>
          <Form onSubmit={manejarEnvio}>
            <Form.Group className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                isInvalid={!!errores.nombre}
                placeholder="Ej: Juan Pérez"
              />
              <Form.Control.Feedback type="invalid">
                {errores.nombre}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Correo electrónico</Form.Label>
              <Form.Control
                type="email"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                isInvalid={!!errores.correo}
                placeholder="Ej: usuario@email.com"
              />
              <Form.Control.Feedback type="invalid">
                {errores.correo}
              </Form.Control.Feedback>
            </Form.Group>

            <Button variant="success" type="submit">
              Crear Usuario
            </Button>
          </Form>
        </Card.Body>
      </Card>

      {/* Mostrar resultado si el usuario fue creado */}
      {usuarioCreado && (
        <Alert variant="info" className="mt-3">
          <strong>Usuario creado:</strong> {usuarioCreado.nombre} (
          {usuarioCreado.correo})
        </Alert>
      )}
    </>
  );
}

export default FormularioUsuario;

/* const nuevosErrores = {};
- Creamos un objeto vacío que va a guardar los errores encontrados.
- No usamos directamente setErrores todavía, porque primero queremos revisar todos los campos.

 */

// Object.keys(nuevosErrores) devuelve un array con las claves del objeto (por ejemplo: ["nombre", "correo"]).
// .length > 0 significa que hay al menos un error

/*  if (!nombre.trim()) {
      nuevosErrores.nombre = "El nombre es obligatorio";
    } 
    - Verificamos si el campo nombre está vacío o solo tiene espacios
    - Si es así, agregamos una propiedad al objeto nuevosErrores:
        nuevosErrores.nombre = "El nombre es obligatorio";


*/
