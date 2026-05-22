// ==========================================
// TYPE
// ==========================================

export type Product = {
  id?: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
};


// URL API
const URL = "https://fakestoreapi.com/products";


// ==========================================
// GET -> OBTENER PRODUCTOS
// ==========================================

export const getProducts = async (): Promise<Product[]> => {

  try {

    // petición GET
    const response = await fetch(URL);

    // verificar respuesta
    if (!response.ok) {
      throw new Error("Error al obtener productos");
    }

    // convertir JSON
    const data = await response.json();

    return data;

  } catch (error) {

    console.error(error);

    throw error;
  }
};


// ==========================================
// POST -> CREAR PRODUCTO
// ==========================================

export const createProduct = async (
  product: Product
): Promise<Product> => {

  try {

    const response = await fetch(URL, {

      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(product),
    });

    if (!response.ok) {
      throw new Error("Error al crear producto");
    }

    const data = await response.json();

    return data;

  } catch (error) {

    console.error(error);

    throw error;
  }
};