import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Alert,
  Navbar,
  Button,
} from "react-bootstrap";
import UserForm from "./components/CRUD/UserForm";
import UserList from "./components/CRUD/UserList";

// 🔒 FUNCIONES DE SEGURIDAD AVANZADAS
const isLocalStorageAvailable = () => {
  try {
    const test = "test";
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch (e) {
    return false;
  }
};

const validateUser = (user) => {
  return (
    user &&
    typeof user === "object" &&
    typeof user.id === "number" &&
    user.id > 0 &&
    typeof user.name === "string" &&
    user.name.trim().length > 0 &&
    typeof user.email === "string" &&
    user.email.includes("@") &&
    typeof user.phone === "string" &&
    user.phone.trim().length > 0
  );
};

const sanitizeUser = (user) => {
  return {
    id: Number(user.id) || Date.now(),
    name: String(user.name || "")
      .replace(/[<>&"']/g, "")
      .trim(),
    email: String(user.email || "")
      .replace(/[<>&"']/g, "")
      .trim(),
    phone: String(user.phone || "")
      .replace(/[<>&"']/g, "")
      .trim(),
  };
};

function Crud() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [alert, setAlert] = useState({ show: false, message: "", type: "" });

  // ========== EFFECT PARA CARGAR USUARIOS (ROBUSTO) ==========
  useEffect(() => {
    console.log("🛡️ Iniciando carga segura de datos...");

    // 1. Verificar si localStorage está disponible
    if (!isLocalStorageAvailable()) {
      console.warn("⚠️ localStorage no disponible, usando datos en memoria");
      showAlert(
        "Modo sin persistencia: los datos se perderán al recargar",
        "warning"
      );
      loadDefaultUsers();
      return;
    }

    // 2. Obtener datos de localStorage
    const savedUsers = localStorage.getItem("crud-users");
    console.log("💾 Contenido de localStorage:", savedUsers);

    // 3. Procesar datos existentes
    if (
      savedUsers &&
      savedUsers !== "[]" &&
      savedUsers !== "null" &&
      savedUsers !== "undefined"
    ) {
      try {
        const usersFromStorage = JSON.parse(savedUsers);

        // 4. Validación EXTRA robusta
        if (Array.isArray(usersFromStorage)) {
          // Filtrar y sanitizar usuarios válidos
          const validUsers = usersFromStorage
            .filter(validateUser)
            .map(sanitizeUser);

          if (validUsers.length > 0) {
            console.log(
              "✅ Cargados",
              validUsers.length,
              "usuarios válidos desde localStorage"
            );
            setUsers(validUsers);
            return;
          } else {
            console.warn(
              "⚠️ No se encontraron usuarios válidos en localStorage"
            );
          }
        } else {
          console.warn("⚠️ Datos en localStorage no son un array válido");
        }
      } catch (error) {
        console.error("❌ Error crítico con localStorage:", error);
        showAlert(
          "Error cargando datos guardados. Se usarán datos por defecto.",
          "danger"
        );
      }
    }

    // 5. SOLO si todo lo anterior falla, cargar por defecto
    console.log("⚡ Cargando usuarios por defecto");
    loadDefaultUsers();
  }, []);

  // ========== EFFECT PARA GUARDAR (SEGURO) ==========
  useEffect(() => {
    if (users.length > 0 && isLocalStorageAvailable()) {
      try {
        localStorage.setItem("crud-users", JSON.stringify(users));
        console.log("💾 Guardados", users.length, "usuarios en localStorage");
      } catch (error) {
        if (error.name === "QuotaExceededError") {
          console.error("💥 localStorage lleno");
          showAlert(
            "Error: No hay espacio suficiente para guardar los datos",
            "danger"
          );
        } else {
          console.error("💥 Error guardando en localStorage:", error);
        }
      }
    }
  }, [users]);

  // ========== FUNCIONES PRINCIPALES ==========
  const loadDefaultUsers = () => {
    const initialUsers = [
      {
        id: 1,
        name: "Ana García",
        email: "ana@email.com",
        phone: "123-456-7890",
      },
      {
        id: 2,
        name: "Carlos López",
        email: "carlos@email.com",
        phone: "098-765-4321",
      },
    ];
    setUsers(initialUsers);
  };

  const showAlert = (message, type = "success") => {
    setAlert({ show: true, message, type });
    setTimeout(() => setAlert({ show: false, message: "", type: "" }), 4000);
  };

  // ========== OPERACIONES CRUD SEGURAS ==========
  const addUser = (userData) => {
    const sanitizedData = sanitizeUser(userData);
    const newUser = {
      id: Date.now(),
      ...sanitizedData,
    };
    setUsers([...users, newUser]);
    showAlert("Usuario creado exitosamente!", "success");
  };

  const updateUser = (userData) => {
    const sanitizedData = sanitizeUser(userData);
    const updatedUsers = users.map((user) =>
      user.id === editingUser.id ? { ...user, ...sanitizedData } : user
    );
    setUsers(updatedUsers);
    setEditingUser(null);
    showAlert("Usuario actualizado exitosamente!", "info");
  };

  const deleteUser = (userId) => {
    const filteredUsers = users.filter((user) => user.id !== userId);
    setUsers(filteredUsers);
    showAlert("Usuario eliminado exitosamente!", "warning");
  };

  // ========== FUNCIONES DE UTILIDAD (PARA TESTING) ==========
  const clearAllData = () => {
    if (
      window.confirm(
        "¿Estás seguro de que quieres eliminar TODOS los usuarios y datos?"
      )
    ) {
      if (isLocalStorageAvailable()) {
        localStorage.removeItem("crud-users");
      }
      setUsers([]);
      showAlert("Todos los datos han sido eliminados", "danger");
    }
  };

  const resetToDefault = () => {
    if (
      window.confirm(
        "¿Restaurar usuarios por defecto? Se perderán los datos actuales."
      )
    ) {
      loadDefaultUsers();
      showAlert("Datos restaurados a valores por defecto", "info");
    }
  };

  const startEditing = (user) => {
    setEditingUser(user);
  };

  const cancelEditing = () => {
    setEditingUser(null);
    showAlert("Edición cancelada", "secondary");
  };

  // ========== RENDER DEL COMPONENTE ==========
  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
        <Container>
          <Navbar.Brand href="#">
            <i className="bi bi-people-fill me-2"></i>
            Sistema CRUD de Usuarios 🛡️
          </Navbar.Brand>
          <Navbar.Text className="d-flex gap-2">
            <Button
              variant="outline-warning"
              size="sm"
              onClick={resetToDefault}
              title="Restaurar datos por defecto"
            >
              <i className="bi bi-arrow-clockwise"></i>
            </Button>
            <Button
              variant="outline-danger"
              size="sm"
              onClick={clearAllData}
              title="Limpiar todos los datos"
            >
              <i className="bi bi-trash"></i>
            </Button>
          </Navbar.Text>
        </Container>
      </Navbar>

      <Container fluid="md">
        {alert.show && (
          <Alert
            variant={alert.type}
            dismissible
            onClose={() => setAlert({ show: false, message: "", type: "" })}
          >
            {alert.message}
          </Alert>
        )}

        <Row className="g-4">
          <Col lg={4}>
            <Card className="h-100 shadow-sm">
              <Card.Header className="bg-primary text-white">
                <h5 className="mb-0">
                  <i className="bi bi-person-plus me-2"></i>
                  {editingUser ? "Editar Usuario" : "Agregar Usuario"}
                </h5>
              </Card.Header>
              <Card.Body>
                <UserForm
                  onAddUser={addUser}
                  onUpdateUser={updateUser}
                  editingUser={editingUser}
                  onCancelEdit={cancelEditing}
                />
              </Card.Body>
            </Card>
          </Col>

          <Col lg={8}>
            <Card className="shadow-sm">
              <Card.Header className="bg-success text-white d-flex justify-content-between align-items-center">
                <h5 className="mb-0">
                  <i className="bi bi-list-ul me-2"></i>
                  Lista de Usuarios ({users.length})
                </h5>
                <small>
                  {isLocalStorageAvailable()
                    ? "💾 Datos guardados"
                    : "⚠️ Sin persistencia"}
                </small>
              </Card.Header>
              <Card.Body>
                <UserList
                  users={users}
                  onEditUser={startEditing}
                  onDeleteUser={deleteUser}
                />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Crud;
