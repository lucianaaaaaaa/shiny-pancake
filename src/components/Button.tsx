import "./Button.css";

//solo se permiten estos valores
type Variant = "primary" | "secondary" | "danger";
type Size = "small" | "medium" | "large";

//children: contenido dinámico
//variant: tipo del boton (color)
//size: tamano
//onclick: funcion al click
//disabled: true/false habilitado
type ButtonProps = {
  children: React.ReactNode;
  variant?: Variant;
  size?: Size;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
};

function Button({
  children,
  variant = "primary",
  size = "medium",
  onClick,
  disabled = false,
}: ButtonProps) {
  return (
    <button
      className={`btn ${variant} ${size}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;