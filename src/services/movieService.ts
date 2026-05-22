// ==========================================
// TYPE
// ==========================================

export type Movie = {
  id?: number;
  title: string;
  rating: number;
  description: string;
};


// URL API
const URL = "https://dummyjson.com/products";


// ==========================================
// GET MOVIES
// ==========================================

export const getMovies = async (): Promise<Movie[]> => {

  try {

    const response = await fetch(URL);

    if (!response.ok) {
      throw new Error("Error al obtener películas");
    }

    const data = await response.json();

    // dummyjson devuelve:
    // { products: [] }

    return data.products;

  } catch (error) {

    console.error(error);

    throw error;
  }
};


// ==========================================
// CREATE MOVIE
// ==========================================

export const createMovie = async (
  movie: Movie
): Promise<Movie> => {

  try {

    const response = await fetch(URL + "/add", {

      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(movie),
    });

    if (!response.ok) {
      throw new Error("Error al registrar película");
    }

    const data = await response.json();

    return data;

  } catch (error) {

    console.error(error);

    throw error;
  }
};