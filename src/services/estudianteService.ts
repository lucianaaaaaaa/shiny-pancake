export type Estudiante = {
  codigo?: number;
  nombres: string;
  carrera: string;
  correo: string;
  edad: number;
};

const API_URL =
  import.meta.env.VITE_API_ESTUDIANTES_URL ??
  "http://localhost/api2/estudiantes.php";

export const getEstudiantes = async (): Promise<Estudiante[]> => {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Error al obtener estudiantes");
  }

  return response.json();
};

export const getEstudiante = async (codigo: number): Promise<Estudiante> => {
  const response = await fetch(`${API_URL}?codigo=${codigo}`);

  if (!response.ok) {
    throw new Error("Error al obtener estudiante");
  }

  return response.json();
};

export const createEstudiante = async (estudiante: Estudiante) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(estudiante),
  });

  if (!response.ok) {
    throw new Error("Error al registrar estudiante");
  }

  return response.json();
};

export const updateEstudiante = async (estudiante: Estudiante) => {
  const response = await fetch(API_URL, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(estudiante),
  });

  if (!response.ok) {
    throw new Error("Error al actualizar estudiante");
  }

  return response.json();
};

export const deleteEstudiante = async (codigo: number) => {
  const response = await fetch(`${API_URL}?codigo=${codigo}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Error al eliminar estudiante");
  }

  return response.json();
};
