import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";

function UserForm({ onAddUser, onUpdateUser, editingUser, onCancelEdit }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [validated, setValidated] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingUser) {
      setFormData({
        name: editingUser.name,
        email: editingUser.email,
        phone: editingUser.phone,
      });
    } else {
      setFormData({ name: "", email: "", phone: "" });
    }
    setValidated(false);
    setErrors({});
  }, [editingUser]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "El nombre es requerido";
    }

    if (!formData.email.trim()) {
      newErrors.email = "El email es requerido";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "El email no es válido";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "El teléfono es requerido";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity() === false || !validateForm()) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    if (editingUser) {
      onUpdateUser(formData);
    } else {
      onAddUser(formData);
    }

    setFormData({ name: "", email: "", phone: "" });
    setValidated(false);
    setErrors({});
  };

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Row className="g-3">
        <Col md={12}>
          <Form.Group>
            <Form.Label>Nombre completo</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Ej: Juan Pérez"
              required
              isInvalid={!!errors.name}
            />
            <Form.Control.Feedback type="invalid">
              {errors.name}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>

        <Col md={12}>
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Ej: usuario@email.com"
              required
              isInvalid={!!errors.email}
            />
            <Form.Control.Feedback type="invalid">
              {errors.email}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>

        <Col md={12}>
          <Form.Group>
            <Form.Label>Teléfono</Form.Label>
            <Form.Control
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Ej: 123-456-7890"
              required
              isInvalid={!!errors.phone}
            />
            <Form.Control.Feedback type="invalid">
              {errors.phone}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>

        <Col md={12}>
          <div className="d-grid gap-2 d-md-flex">
            <Button
              variant={editingUser ? "warning" : "primary"}
              type="submit"
              className="me-2"
            >
              <i
                className={`bi ${
                  editingUser ? "bi-check-circle" : "bi-person-plus"
                } me-2`}
              ></i>
              {editingUser ? "Actualizar Usuario" : "Agregar Usuario"}
            </Button>

            {editingUser && (
              <Button variant="secondary" onClick={onCancelEdit} type="button">
                <i className="bi bi-x-circle me-2"></i>
                Cancelar
              </Button>
            )}
          </div>
        </Col>
      </Row>
    </Form>
  );
}

export default UserForm;
