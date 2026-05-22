//estructura de un usuario
export type User = {
  id?: number;
  name: string;
  email: string;
};

// URL de la API que se consumirá
const URL = "https://jsonplaceholder.typicode.com/users";

// ==========================================
// GET -> OBTENER USUARIOS
// ==========================================

// async indica que la función trabajará con procesos asíncronos
// Promise<User[]> significa:
// "la función devolverá una promesa con un arreglo de usuarios"
export const getUsers = async (): Promise<User[]> => {
  try {

    // fetch realiza petición HTTP
    // await espera la respuesta del servidor
    const response = await fetch(URL);

    // si falla, se genera un error
    if (!response.ok) {
      throw new Error("Error al obtener usuarios");
    }

     // convierte la respuesta JSON a objeto JavaScript
    const data = await response.json();

    // retorna los datos obtenidos
    return data;
  } catch (error) {
    console.error(error);
    // muestra el error en consola
    throw error;
    //lanza el error a quien llamo a la funcion
  }
};

// ==========================================
// POST -> CREAR USUARIOS
// ==========================================

// user: User
// recibe un objeto de tipo User

// Promise<User>
// devolverá una promesa con un usuario
export const createUser = async (user: User): Promise<User> => {
  try {
    const response = await fetch(URL, {
      method: "POST",
      headers: {
        // indica que se enviará JSON
        "Content-Type": "application/json",
      },
      // JSON.stringify convierte objeto JS a texto JSON
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      throw new Error("Error al crear usuario");
    }

    // convierte respuesta JSON a objeto JS
    const data = await response.json();

    // retorna los datos obtenidos
    return data;
  } catch (error) {
    // muestra error en consola
    console.error(error);
     // relanza error
    throw error;
  }
};