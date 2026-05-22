import "./Card.css";

type Variant = "primary" | "secondary" | "danger";

//children: contenido dinámico
//variant: tipo del boton (color)
type CardProps = {
  title: string;
  description: string;
  image: string;
  variant?: Variant;
  children?: React.ReactNode;
};

function Card({
  title,
  description,
  image,
  variant = "primary",
  children,
}: CardProps) {
  return (
    <div className={`card ${variant}`}>

      <img src={image} alt={title} />

      <div className="card-body">

        <h3>{title}</h3>

        <p>{description}</p>

        <div className="card-footer">
          {children}
        </div>

      </div>

    </div>
  );
}

export default Card;