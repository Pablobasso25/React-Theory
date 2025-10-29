import { Card } from "react-bootstrap";

// Componente funcional que recibe props desde el padre
const TarjetaUsuario = ({ nombre, correo }) => {
  return (
    <Card className="mt-3 shadow-sm">
      <Card.Body>
        <Card.Title>👤 Usuario</Card.Title>
        <Card.Text>
          <strong>Nombre:</strong> {nombre}
          <br />
          <strong>Correo:</strong> {correo}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};
// se exporta a: ListaUsuario (componente padre)
export default TarjetaUsuario;
