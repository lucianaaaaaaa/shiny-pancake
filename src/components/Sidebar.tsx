import { Link } from "react-router-dom";

type MenuItem = {
  name: string;
  path: string;
};

type SidebarProps = {
  menu: MenuItem[];
};

export default function Sidebar({ menu }: SidebarProps) {
  return (
    <aside className="sidebar">
      <ul>
        {menu.map((item, index) => (
          <li key={index}>
            <Link to={item.path}>{item.name}</Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}