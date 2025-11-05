import React from "react";
import { Row, Col, Alert } from "react-bootstrap";
import UserCard from "./UserCard";

function UserList({ users, onEditUser, onDeleteUser }) {
  return (
    <div>
      {users.length === 0 ? (
        <Alert variant="info" className="text-center">
          <i className="bi bi-info-circle me-2"></i>
          No hay usuarios registrados. ¡Agrega el primero!
        </Alert>
      ) : (
        <Row className="g-3">
          {users.map((user) => (
            <Col key={user.id} xs={12} md={6} lg={4}>
              <UserCard
                user={user}
                onEdit={onEditUser}
                onDelete={onDeleteUser}
              />
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
}

export default UserList;
