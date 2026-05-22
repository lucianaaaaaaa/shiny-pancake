// ==========================================
// TYPE
// ==========================================
export type Producto = {
  id?: number;
  nombre: string;
  precio: number;
  descripcion: string;
};
// Generalmente el id no se envía al crear un producto,
// porque la base de datos lo genera automáticamente.

// URL donde se encuentra la API PHP.
// Todas las peticiones fetch utilizarán esta dirección.
const URL = "https://libreriamanitas.com/api/productos.php";

// ==========================================
// RECUPERAR TODOS - GET ALL
// ==========================================

// Función asíncrona que retorna un arreglo
// de productos desde la API.
export const getProductos = async (): Promise<Producto[]> => {
    try {
      const response=await fetch(URL);
      if (!response.ok) {
        throw new Error(
          "Error al obtener productos"
        );
      }
       // Convierte la respuesta JSON a objeto JavaScript.
      const data=await response.json();
       // Retorna los datos obtenidos.
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
};

// ==========================================
// RETORNAR UN SOLO PROD - GET ONE
// ==========================================

// Función para obtener un solo producto
// enviando el id por parámetro.
export const getProducto = async(id: number): Promise<Producto> => {
    try {
      // Se envía el id en la URL usando query string.
      const response=await fetch(`${URL}?id=${id}`);
      if (!response.ok) {
        throw new Error(
          "Error al obtener producto"
        );
      }

      const data=await response.json();
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
};

// ==========================================
// CREAR - POST
// ==========================================

// Función para registrar un nuevo producto.
export const createProducto = async(producto: Producto) => {
    try {
      // Realiza una petición POST.
      // headers: Cabeceras de la petición.
      // Indica que se enviará JSON.
      const response = await fetch(URL, {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify(producto),
        });
      // Convierte el objeto producto a JSON.
      if (!response.ok) {
        throw new Error(
          "Error al registrar producto"
        );
      }
      return await response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
};

// ==========================================
// ACTUALIZAR - PUT
// ==========================================

// Función para actualizar un producto existente.
export const updateProducto = async (producto: Producto) => {
    try {
      const response =
        await fetch(URL, {
          method: "PUT",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify(producto),
        });

      if (!response.ok) {
        throw new Error(
          "Error al actualizar producto"
        );
      }
      return await response.json();
    } catch (error) {
     console.error(error);
      throw error;
    }
};

// ==========================================
// ELIMINAR - DELETE
// ==========================================

// Función para eliminar un producto mediante su id.
export const deleteProducto = async (id: number) => {
    try {
      const response =
        await fetch(`${URL}?id=${id}`, {
          method: "DELETE",
        });
      if (!response.ok) {
       throw new Error(
          "Error al eliminar producto"
        );
      }
      return await response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
};