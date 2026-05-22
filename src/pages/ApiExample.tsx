// useState: manejar estados
// useEffect: ejecutar código automáticamente
import { useEffect, useState } from "react";

// Importa funciones del service
// getUsers: obtiene usuarios
// createUser: crea usuarios
// User: Estructura de un usuario
import { getUsers, createUser, type User } from "../services/api";

function ApiExample() {

  // ==========================================
  // ESTADOS
  // ==========================================
   // users almacena lista de usuarios [] valor inicial vacío
  const [users, setUsers] = useState<User[]>([]);
  // loading controla si algo está cargando
  const [loading, setLoading] = useState(false);
  // error almacena mensajes de error
  const [error, setError] = useState("");
  // estado para input nombre
  const [name, setName] = useState("");
  // estado para input email
  const [email, setEmail] = useState("");

  // ==========================================
  // GET -> CARGAR USUARIOS
  // ==========================================

   // función asíncrona
  const loadUsers = async () => {
    try {
       // activa loading
      setLoading(true);
      // limpia errores anteriores
      setError("");

       // llama a la API
      const data = await getUsers();
      // cuando complete guarda usuarios en estado
      setUsers(data);
    } catch (error) {
      // mensaje de error
      setError("No se pudieron cargar los usuarios");
    } finally {
      // finally se ejecuta SIEMPRE
      // exista error o no
      // desactiva loading
      setLoading(false);
    }
  };

  // ==========================================
  // useEffect
  // ==========================================

  // se ejecuta automáticamente
  // cuando el componente se renderiza por primera vez
  useEffect(() => {
    // cargar usuarios
    loadUsers();
  }, []);
  // [] significa: ejecutar solo una vez
  
  // ==========================================
  // POST -> CREAR USUARIO
  // ==========================================
  // e: React.FormEvent
  // representa el evento del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    // evita recargar la página
    e.preventDefault();

    try {
      // objeto nuevo usuario
      const newUser = {
        name,
        email,
      };

      // llama API POST
      const createdUser = await createUser(newUser);

      // agrega nuevo usuario al array existente
      setUsers([...users, createdUser]);

      // limpia inputs
      setName("");
      setEmail("");

      // mensaje éxito
      alert("Usuario creado correctamente");
    } catch (error) {
      // mensaje error
      setError("Error al crear usuario");
    }
  };

  return (
    <div>
      <h1>Fetch API con React + TypeScript</h1>

      <hr />

      <h2>Crear Usuario</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button type="submit">
          Guardar
        </button>
      </form>

      <hr />

      <h2>Lista de Usuarios</h2>

      {/* renderizado condicional */}
      {/* si loading es true muestra parrafo */}
      {loading && <p>Cargando usuarios...</p>}
      {/* loading ? <p>Cargando usuarios...</p> : null */}

      {/* si existe error */}
      {error && <p>{error}</p>}

      {/* lista usuarios */}
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} - {user.email}
          </li>
        ))}
      </ul>

</div>
  );
}

export default ApiExample;
