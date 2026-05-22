import "./Badge.css";

// Tipos permitidos
type BadgeType =
  | "beginner"
  | "intermediate"
  | "advanced";

// Props del componente
type BadgeProps = {
  children: React.ReactNode;
  type?: BadgeType;
};

function Badge({
  children,
  type = "beginner",
}: BadgeProps) {
  return (
    <span className={`badge ${type}`}>
      {children}
    </span>
  );
}

export default Badge;