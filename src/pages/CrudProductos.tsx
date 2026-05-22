// useEffect permite ejecutar código automáticamente.
// useState permite manejar estados dentro del componente.
import {useEffect, useState,} from "react";
// Importa funciones del servicio CRUD.
// También importa el type Producto.
import {getProductos,createProducto,updateProducto,deleteProducto,type Producto,} from "../services/crudProductoService";

function CrudProductos() {

  // ==========================================
  // ESTADOS
  // ==========================================

  // Estado que almacena la lista de productos.
  const [productos, setProductos]=useState<Producto[]>([]);
  // Estado para mostrar si está cargando datos.
  const [loading, setLoading]=useState(false);
  // Estado para guardar mensajes de error.
  const [error, setError]=useState("");
  // Estado que indica si se está editando. false:crear | true:editar
  const [editing, setEditing]=useState(false);
   // Estado para guardar el id del producto.
  const [id, setId]=useState<number|null>(null);
   // Estado para el nombre del producto.
  const [nombre, setNombre]=useState("");
   // Estado para el precio.
  const [precio, setPrecio]=useState(0);
   // Estado para la descripción.
  const [descripcion, setDescripcion]=useState("");

  // ==========================================
  // CARGAR PRODUCTOS - LOAD
  // ==========================================

 // Función para recuperar todos los productos.
  const loadProductos = async () => {
    try {
       // Activa el loading.
      setLoading(true);
       // Limpia errores anteriores.
      setError("");
      // Obtiene datos desde la API.
      const data=await getProductos();
      // Guarda productos en el estado.
      setProductos(data);
    } catch (error) {
      setError(
        "Error al cargar productos"
      );
    } finally {
      setLoading(false);
    }
  };

// useEffect se ejecuta una sola vez
  // al cargar el componente.
useEffect(()=>{loadProductos();}, []);

  // ==========================================
  // GUARDAR PRODUCTO - SAVE
  // ==========================================

 // Función que se ejecuta al enviar formulario.
  const handleSubmit = async (e: React.FormEvent) => {
    // Evita que el formulario recargue la página.
    e.preventDefault();
    try {
      const producto: Producto = {
        // Si id es null se envía undefined.
        id: id || undefined,
         // Datos del formulario.
        nombre,
        precio,
        descripcion,
      };

      // EDITAR
      // Actualiza producto.
      //el formulario es reutilizado para:
      //registrar productos
      //editar productos
      if (editing) 
      {
        await updateProducto(producto);
      }
      else 
      {
        // CREAR
        await createProducto(producto);
      }
      // recargar
      loadProductos();
      // limpiar
      resetForm();
    } catch (error) {
      setError(
        "Error al guardar"
      );
    }
  };


  // ==========================================
  // ELIMINAR - DELETE
  // ==========================================

 // Función para eliminar producto.
  const handleDelete = async (id: number) => {
    if (!confirm("¿Eliminar producto?"))
    {
      // Si cancela sale de la función.
      return;
    }

    try {
      // Elimina producto desde API.
      await deleteProducto(id);
       // Recarga lista.
      loadProductos();
    } catch (error) {
      setError(
        "Error al eliminar"
      );
    }
  };


  // ==========================================
  // EDITAR - EDIT
  // ==========================================

// Carga datos del producto al formulario.
  const handleEdit = (producto: Producto) => {
     // Activa modo edición.
    setEditing(true);
     // Guarda id.
    setId(producto.id || null);
    // Carga datos en inputs.
    setNombre(producto.nombre);
    setPrecio(producto.precio);
    setDescripcion(producto.descripcion);
  };


  // ==========================================
  // RESET
  // ==========================================

 // Limpia formulario
  const resetForm = () => {
     // Desactiva edición.
    setEditing(false);
    //resetea los datos
    setId(null);
    setNombre("");
    setPrecio(0);
    setDescripcion("");
  };


  // ==========================================
  // COMPONENTE PRINCIPAL
  // ==========================================

  return (

    <div>

      <h1>
        CRUD Productos
      </h1>

      <hr />

      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Nombre" value={nombre} onChange={(e)=>setNombre(e.target.value)} />
        <br /><br />
        <input type="number" placeholder="Precio" value={precio} onChange={(e)=> setPrecio(Number(e.target.value))} />
        <br /><br />
        <textarea placeholder="Descripción" value={descripcion} onChange={(e)=>setDescripcion(e.target.value)} />
        <br /><br />

        <button type="submit">
          {editing ? "Actualizar":"Guardar"}
        </button>

        {" "}

        <button type="button" onClick={resetForm}>
          Limpiar
        </button>

      </form>

      <hr />

      {loading && <p>Cargando...</p>}

      {error&&<p>{error}</p>}

      <h2>
        Lista Productos
      </h2>

      <ul>
        {productos.map((p) => (
          <li key={p.id}>
            <strong>{p.nombre}</strong>
            <br />
            Precio: Bs. {p.precio}
            <br />
            {p.descripcion}
            <br /><br />
            <button onClick={()=>handleEdit(p)}>
              Editar
            </button>

            {" "}

            <button onClick={()=>handleDelete(p.id!)}>
              Eliminar
            </button>

            <hr />

          </li>
        ))}

      </ul>

    </div>
  );
}

export default CrudProductos;