export default function Roles() {
  const roles = ["Administrador", "Editor", "Usuario"];

  return (
    <>
      <h2>Roles</h2>
      <p>Listado de roles del sistema.</p>

      <ul>
        {roles.map((rol, index) => (
          <li key={index}>{rol}</li>
        ))}
      </ul>
    </>
  );
}