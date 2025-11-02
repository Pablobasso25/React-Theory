// src/components/TiendaOnline.jsx - VERSIÓN COMPLETA
import React, { useState } from 'react';
import { Card, Button, Badge, Row, Col, Alert, ListGroup } from 'react-bootstrap';

function TiendaOnline() {
  const [productos] = useState([
    { id: 1, nombre: 'Laptop Gamer', precio: 1200, categoria: 'tecnologia', stock: 3 },
    { id: 2, nombre: 'Smartphone', precio: 800, categoria: 'tecnologia', stock: 0 },
    { id: 3, nombre: 'Auriculares Bluetooth', precio: 150, categoria: 'accesorios', stock: 10 },
    { id: 4, nombre: 'Tablet', precio: 400, categoria: 'tecnologia', stock: 2 },
    { id: 5, nombre: 'Mouse Inalámbrico', precio: 50, categoria: 'accesorios', stock: 15 },
    { id: 6, nombre: 'Teclado Mecánico', precio: 120, categoria: 'accesorios', stock: 8 },
    { id: 7, nombre: 'Monitor 24"', precio: 300, categoria: 'tecnologia', stock: 5 },
    { id: 8, nombre: 'Cargador Portátil', precio: 80, categoria: 'accesorios', stock: 0 }
  ]);

  const [categoriaFiltro, setCategoriaFiltro] = useState('todos');
  const [carrito, setCarrito] = useState([]);

  const productosFiltrados = productos.filter(producto => 
    categoriaFiltro === 'todos' || producto.categoria === categoriaFiltro
  );

  const categorias = ['todos', ...new Set(productos.map(p => p.categoria))];

  const totalCarrito = carrito.reduce((total, producto) => total + producto.precio, 0);

  const vaciarCarrito = () => {
    setCarrito([]);
  };

  return (
    <Card className="shadow-sm">
      <Card.Header>
        <div className="d-flex justify-content-between align-items-center">
          <h5 className="mb-0">🛒 Tienda Online</h5>
          <div>
            <Badge bg="primary" className="me-2">{carrito.length} items</Badge>
            <Badge bg="success">${totalCarrito}</Badge>
          </div>
        </div>
      </Card.Header>
      
      <Card.Body>
        {/* 🎯 FILTROS */}
        <div className="mb-4">
          <strong>Filtrar por categoría:</strong>
          <div className="mt-2 d-flex flex-wrap gap-2">
            {categorias.map(categoria => (
              <Button
                key={categoria}
                size="sm"
                variant={categoriaFiltro === categoria ? 'primary' : 'outline-primary'}
                onClick={() => setCategoriaFiltro(categoria)}
              >
                {categoria === 'todos' ? '📦 Todos' : 
                 categoria === 'tecnologia' ? '💻 Tecnología' : '🎧 Accesorios'}
              </Button>
            ))}
          </div>
        </div>

        {/* 📊 CONTADORES */}
        <div className="mb-3">
          <small className="text-muted">
            Mostrando {productosFiltrados.length} de {productos.length} productos
            {categoriaFiltro !== 'todos' && ` en ${categoriaFiltro}`}
          </small>
        </div>

        {/* 🎯 LISTA VACÍA */}
        {productosFiltrados.length === 0 && (
          <Alert variant="info" className="text-center">
            {categoriaFiltro === 'todos' 
              ? '📦 No hay productos disponibles' 
              : `📦 No hay productos en la categoría "${categoriaFiltro}"`}
          </Alert>
        )}

        {/* 📦 LISTA DE PRODUCTOS */}
        <Row>
          {productosFiltrados.map(producto => (
            <Col key={producto.id} md={6} className="mb-3">
              <Card className="h-100">
                <Card.Body className="d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <Card.Title className="h6 mb-0">{producto.nombre}</Card.Title>
                    <Badge bg="success">${producto.precio}</Badge>
                  </div>
                  
                  <div className="mb-2">
                    <small className="text-muted">
                      Categoría: {producto.categoria === 'tecnologia' ? '💻 Tecnología' : '🎧 Accesorios'}
                    </small>
                  </div>
                  
                  <div className="mb-3">
                    {producto.stock === 0 ? (
                      <Badge bg="danger">🚫 Agotado</Badge>
                    ) : producto.stock < 5 ? (
                      <Badge bg="warning">⚠️ Últimas {producto.stock} unidades</Badge>
                    ) : (
                      <Badge bg="success">✅ En stock ({producto.stock})</Badge>
                    )}
                  </div>
                  
                  <div className="mt-auto">
                    {producto.stock > 0 ? (
                      <Button 
                        variant="primary" 
                        size="sm"
                        className="w-100"
                        onClick={() => setCarrito([...carrito, producto])}
                      >
                        🛒 Agregar al Carrito
                      </Button>
                    ) : (
                      <Button variant="secondary" size="sm" disabled className="w-100">
                        ❌ Sin Stock
                      </Button>
                    )}
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* 🛒 CARRITO DE COMPRAS */}
        {carrito.length > 0 && (
          <Card className="mt-4 bg-light">
            <Card.Header>
              <div className="d-flex justify-content-between align-items-center">
                <h6 className="mb-0">🛒 Tu Carrito</h6>
                <div>
                  <Button variant="outline-danger" size="sm" onClick={vaciarCarrito}>
                    🗑️ Vaciar
                  </Button>
                </div>
              </div>
            </Card.Header>
            <Card.Body>
              <ListGroup variant="flush">
                {carrito.map((producto, index) => (
                  <ListGroup.Item key={index} className="d-flex justify-content-between">
                    <span>{producto.nombre}</span>
                    <Badge bg="primary">${producto.precio}</Badge>
                  </ListGroup.Item>
                ))}
              </ListGroup>
              <div className="d-flex justify-content-between mt-3">
                <strong>Total:</strong>
                <Badge bg="success" className="fs-6">${totalCarrito}</Badge>
              </div>
            </Card.Body>
          </Card>
        )}
      </Card.Body>
    </Card>
  );
}

export default TiendaOnline;