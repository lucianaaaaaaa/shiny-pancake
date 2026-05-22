import { useEffect, useState, type FormEvent } from "react";
import {
  createEstudiante,
  deleteEstudiante,
  getEstudiantes,
  updateEstudiante,
  type Estudiante,
} from "../services/estudianteService";

function CrudEstudiantes() {
  const [estudiantes, setEstudiantes] = useState<Estudiante[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState(false);
  const [codigo, setCodigo] = useState<number | null>(null);
  const [nombres, setNombres] = useState("");
  const [carrera, setCarrera] = useState("");
  const [correo, setCorreo] = useState("");
  const [edad, setEdad] = useState(0);

  const loadEstudiantes = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await getEstudiantes();
      setEstudiantes(data);
    } catch (error) {
      setError("No se pudieron cargar los estudiantes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEstudiantes();
  }, []);

  const resetForm = () => {
    setEditing(false);
    setCodigo(null);
    setNombres("");
    setCarrera("");
    setCorreo("");
    setEdad(0);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const estudiante: Estudiante = {
        codigo: codigo ?? undefined,
        nombres,
        carrera,
        correo,
        edad,
      };

      if (editing) {
        await updateEstudiante(estudiante);
      } else {
        await createEstudiante(estudiante);
      }

      await loadEstudiantes();
      resetForm();
    } catch (error) {
      setError("Error al guardar el estudiante");
    }
  };

  const handleEdit = (estudiante: Estudiante) => {
    setEditing(true);
    setCodigo(estudiante.codigo ?? null);
    setNombres(estudiante.nombres);
    setCarrera(estudiante.carrera);
    setCorreo(estudiante.correo);
    setEdad(estudiante.edad);
  };

  const handleDelete = async (codigo: number) => {
    if (!confirm("¿Eliminar estudiante?")) {
      return;
    }

    try {
      await deleteEstudiante(codigo);
      await loadEstudiantes();
    } catch (error) {
      setError("Error al eliminar el estudiante");
    }
  };

  return (
    <div>
      <h1>CRUD Estudiantes</h1>


      <hr />

      <form onSubmit={handleSubmit}>
        {editing && (
          <>
            <label htmlFor="codigo">Código</label>
            <input
              id="codigo"
              type="number"
              value={codigo ?? ""}
              readOnly
            />
            <br />
            <br />
          </>
        )}

        <label htmlFor="nombres">Nombres</label>
        <input
          id="nombres"
          type="text"
          placeholder="Nombres"
          value={nombres}
          onChange={(e) => setNombres(e.target.value)}
        />
        <br />
        <br />

        <label htmlFor="carrera">Carrera</label>
        <input
          id="carrera"
          type="text"
          placeholder="Carrera"
          value={carrera}
          onChange={(e) => setCarrera(e.target.value)}
        />
        <br />
        <br />

        <label htmlFor="correo">Correo</label>
        <input
          id="correo"
          type="email"
          placeholder="Correo"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
        />
        <br />
        <br />

        <label htmlFor="edad">Edad</label>
        <input
          id="edad"
          type="number"
          placeholder="Edad"
          value={edad}
          onChange={(e) => setEdad(Number(e.target.value))}
        />
        <br />
        <br />

        <button type="submit">{editing ? "Actualizar" : "Guardar"}</button>
        {" "}
        <button type="button" onClick={resetForm}>
          Limpiar
        </button>
      </form>

      <hr />

      {loading && <p>Cargando estudiantes...</p>}
      {error && <p>{error}</p>}

      <h2>Lista de Estudiantes</h2>

      <ul>
        {estudiantes.map((estudiante) => (
          <li key={estudiante.codigo}>
            <strong>{estudiante.nombres}</strong>
            <br />
            Carrera: {estudiante.carrera}
            <br />
            Correo: {estudiante.correo}
            <br />
            Edad: {estudiante.edad}
            <br />
            Código: {estudiante.codigo}
            <br />
            <br />
            <button onClick={() => handleEdit(estudiante)}>Editar</button>
            {" "}
            <button onClick={() => handleDelete(estudiante.codigo!)}>
              Eliminar
            </button>
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CrudEstudiantes;
