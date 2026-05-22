import { useEffect, useState } from "react";

import {
  getMovies,
  createMovie,
  type Movie,
} from "../services/movieService";


function Movies() {

  // ==========================================
  // STATES
  // ==========================================

  const [movies, setMovies] = useState<Movie[]>([]);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");


  // formulario
  const [title, setTitle] = useState("");

  const [rating, setRating] = useState(0);


  // ==========================================
  // LOAD MOVIES
  // ==========================================

  const loadMovies = async () => {

    try {

      setLoading(true);

      setError("");

      const data = await getMovies();

      setMovies(data);

    } catch (error) {

      setError("No se pudieron cargar las películas");

    } finally {

      setLoading(false);
    }
  };


  // cargar al iniciar
  useEffect(() => {

    loadMovies();

  }, []);


  // ==========================================
  // SUBMIT
  // ==========================================

  const handleSubmit = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    try {

      const newMovie: Movie = {

        title,

        rating,

        description:
          "Película creada desde React",
      };

      const createdMovie =
        await createMovie(newMovie);

      // agregar localmente
      setMovies([
        ...movies,
        createdMovie,
      ]);

      // limpiar inputs
      setTitle("");

      setRating(0);

      alert("Película registrada");

    } catch (error) {

      setError("Error al registrar película");
    }
  };


  // ==========================================
  // JSX
  // ==========================================

  return (

    <div>

      <h1>Películas</h1>

      <hr />

      {/* FORMULARIO */}
      <h2>Registrar Película</h2>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          placeholder="Título"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
        />

        <input
          type="number"
          placeholder="Rating"
          value={rating}
          onChange={(e) =>
            setRating(Number(e.target.value))
          }
        />

        <button type="submit">
          Guardar
        </button>

      </form>

      <hr />

      {/* LOADING */}
      {loading &&
        <p>Cargando películas...</p>
      }

      {/* ERROR */}
      {error &&
        <p>{error}</p>
      }

      {/* LISTA */}
      <h2>Lista de Películas</h2>

      <ul>

        {movies.map((movie) => (

          <li key={movie.id}>

            <strong>
              {movie.title}
            </strong>

            <br />

            Rating:
            {movie.rating}

          </li>
        ))}

      </ul>

    </div>
  );
}

export default Movies;