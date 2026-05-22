import Button from "../components/Button";
import Card from "../components/Card";

// Importar imgs
import laptop from "../assets/images/laptop.jpg";
import phone from "../assets/images/phone.jpg";
import headphones from "../assets/images/headphones.jpg";

import { useContext } from "react";
import { UserContext } from "../context/UserContext";

export default function Home() {

  const { user } = useContext(UserContext);

  let estado = "";
  if (user.logged) {
    estado = "Sí";
  } else {
    estado = "No";
  }

  return (
    <>
      <h2>Dashboard.</h2>
      <p>Bienvenido {user.name} - Rol: {user.role}</p>
      <p>Sesion activa: {user.logged ? "Sí" : "No"}</p>
      <p>Sesion activa: {estado}</p>


      <div className="cards">

        <Card
          title="Laptop Gamer"
          description="Ryzen 7 - 32GB RAM"
          image={laptop}
          variant="primary"
        >
          <Button variant="primary">
            Comprar
          </Button>
        </Card>

        <Card
          title="Smartphone"
          description="256GB - Camara 108 Mp"
          image={phone}
          variant="secondary"
        >
          <Button variant="secondary">
            Ver más
          </Button>
        </Card>

        <Card
          title="Audífonos"
          description="Con reducción de ruido"
          image={headphones}
          variant="danger"
        >
          <Button variant="danger">
            Comprar
          </Button>
        </Card>


      </div>

      <div className="cards">
        <Button variant="primary" size="medium">
          Guardar
        </Button>

        <Button variant="secondary" size="small">
          Cancelar
        </Button>

        <Button variant="danger" size="large">
          Eliminar
        </Button>

        <Button disabled>
          Deshabilitado
        </Button>

        <Button onClick={() => alert("Click!")}>
          Acción
        </Button>

        <Button variant="primary" size="large" onClick={() => alert("Guardado!")}>
          <span>💾</span> Guardar
        </Button>
        {/* https://www.w3schools.com/charsets/ref_emoji_intro.asp */}
      </div>


    </>
  );
}