import { Card } from "react-bootstrap";

export const MiSaludo = () => {
  return (
    <Card className="text-center mt-4 shadow-sm">
      <Card.Body>
        <Card.Title>👋 Bienvenido a React</Card.Title>
        <Card.Text>
          Este es tu primer componente funcional usando React Bootstrap.
        </Card.Text>
      </Card.Body>
    </Card>
  );
};
