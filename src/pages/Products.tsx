import { useEffect, useState } from "react";

import {
  getProducts,
  createProduct,
  type Product,
} from "../services/productService";


function Products() {

  // ==========================================
  // STATES
  // ==========================================

  const [products, setProducts] = useState<Product[]>([]);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");


  // formulario
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);


  // ==========================================
  // GET PRODUCTS
  // ==========================================

  const loadProducts = async () => {

    try {

      setLoading(true);

      setError("");

      const data = await getProducts();

      setProducts(data);

    } catch (error) {

      setError("No se pudieron cargar los productos");

    } finally {

      setLoading(false);
    }
  };


  // cargar al iniciar
  useEffect(() => {

    loadProducts();

  }, []);


  // ==========================================
  // CREATE PRODUCT
  // ==========================================

  const handleSubmit = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    try {

      const newProduct: Product = {

        title,

        price,

        description: "Producto creado desde React",

        category: "general",

        image:
          "https://i.pravatar.cc",
      };

      const createdProduct =
        await createProduct(newProduct);

      // agregar al estado
      setProducts([
        ...products,
        createdProduct,
      ]);

      // limpiar formulario
      setTitle("");
      setPrice(0);

      alert("Producto registrado");

    } catch (error) {

      setError("Error al crear producto");
    }
  };


  // ==========================================
  // JSX
  // ==========================================

  return (

    <div>

      <h1>Productos</h1>

      <hr />

      {/* FORMULARIO */}
      <h2>Registrar Producto</h2>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          placeholder="Nombre producto"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
        />

        <input
          type="number"
          placeholder="Precio"
          value={price}
          onChange={(e) =>
            setPrice(Number(e.target.value))
          }
        />

        <button type="submit">
          Guardar
        </button>

      </form>

      <hr />

      {/* MENSAJES */}
      {loading &&
        <p>Cargando productos...</p>
      }

      {error &&
        <p>{error}</p>
      }

      {/* LISTA */}
      <h2>Lista de Productos</h2>

      <ul>

        {products.map((product) => (

          <li key={product.id}>

            <strong>
              {product.title}
            </strong>

            <br />

            Precio:
            ${product.price}

          </li>
        ))}

      </ul>

    </div>
  );
}

export default Products;