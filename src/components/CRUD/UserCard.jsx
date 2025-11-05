import React from "react";
import { Card, Button, Badge } from "react-bootstrap";

function UserCard({ user, onEdit, onDelete }) {
  const handleEdit = () => {
    onEdit(user);
  };

  const handleDelete = () => {
    if (
      window.confirm(`¿Estás seguro de que quieres eliminar a ${user.name}?`)
    ) {
      onDelete(user.id);
    }
  };

  return (
    <Card className="h-100 shadow-sm">
      <Card.Header className="bg-light">
        <div className="d-flex justify-content-between align-items-center">
          <Card.Title className="mb-0 h6">{user.name}</Card.Title>
          <Badge bg="secondary">ID: {user.id}</Badge>
        </div>
      </Card.Header>

      <Card.Body>
        <div className="mb-2">
          <strong>
            <i className="bi bi-envelope me-2 text-primary"></i>
            Email:
          </strong>
          <div className="text-muted">{user.email}</div>
        </div>

        <div className="mb-3">
          <strong>
            <i className="bi bi-telephone me-2 text-success"></i>
            Teléfono:
          </strong>
          <div className="text-muted">{user.phone}</div>
        </div>
      </Card.Body>

      <Card.Footer className="bg-white">
        <div className="d-grid gap-2 d-md-flex">
          <Button
            variant="outline-warning"
            size="sm"
            onClick={handleEdit}
            className="me-2 flex-fill"
          >
            <i className="bi bi-pencil-square me-1"></i>
            Editar
          </Button>

          <Button
            variant="outline-danger"
            size="sm"
            onClick={handleDelete}
            className="flex-fill"
          >
            <i className="bi bi-trash me-1"></i>
            Eliminar
          </Button>
        </div>
      </Card.Footer>
    </Card>
  );
}

export default UserCard;
