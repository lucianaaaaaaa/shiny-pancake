import { useContext } from "react";
import { UserContext } from "../context/UserContext";

type FooterProps = {
  company: string;
  year: number;
};

export default function Footer({ company, year }: FooterProps) {

  const { user } = useContext(UserContext);

  return (
    <footer className="footer">
      © {year} {company}


      <h3>Información</h3>

      <p>
        <strong>Ciudad:</strong> {user.city} <strong>Carrera:</strong> {user.career} <strong>Email:</strong> {user.email}
      </p>
      
    </footer>
  );
}