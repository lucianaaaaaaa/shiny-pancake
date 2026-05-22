import { useContext } from "react";
import { UserContext } from "../context/UserContext";

type NavbarProps = {
  title: string;
};

export default function Navbar({ title }: NavbarProps) {

  const { user } = useContext(UserContext);

  return (
    <header className="header">
      <h1>{title} - <span>{user.name}</span> | <span>{user.role}</span></h1>
    </header>
  );
}