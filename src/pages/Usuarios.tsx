const usuarios = [
  { id: 1, nombre: "Carlos", email: "carlos@mail.com" },
  { id: 2, nombre: "María", email: "maria@mail.com" }
];

export default function Usuarios() {
  return (
    <>
      <h2>Usuarios</h2>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
          </tr>
        </thead>

        <tbody>
          {usuarios.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.nombre}</td>
              <td>{u.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}