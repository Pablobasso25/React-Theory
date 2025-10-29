// Importamos el componente TarjetaUsuario
import TarjetaUsuario from "./TarjetaUsuario";

// Componente padre que contiene una lista de usuarios

const ListaUsuarios = () => {
  // Lista de usuarios simulada
  const usuarios = [
    { nombre: "Pablo Basso", correo: "pablobasso25@gmail.com" },
    { nombre: "Jose Diaz", correo: "jose@gmail.com" },
  ];
  return (
    <>
      <div>
        {usuarios.map((usuario, index) => (
          <TarjetaUsuario
            key={index}
            nombre={usuario.nombre}
            correo={usuario.correo}
          />
        ))}
      </div>
      <div>
        <TarjetaUsuario nombre="pablo" correo="padasd@gmail.com" />
      </div>
    </>
  );
};

export default ListaUsuarios;
