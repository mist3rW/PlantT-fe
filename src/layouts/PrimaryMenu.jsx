import { useLocation } from "react-router-dom";
import MenuItem from "./MenuItem";

const menus = [
  { id: 1, to: "/", title: "หน้าแรก" },
  { id: 2, to: "/collection", title: "สินค้าของเรา" },
  { id: 3, to: "/contact", title: "ติดต่อเรา" },
];

export default function PrimaryMenu() {
  const { pathname } = useLocation();
  return (
    <nav className="flex justify-center items-center gap-5">
      {menus.map((el) => (
        <MenuItem
          key={el.id}
          to={el.to}
          title={el.title}
          active={pathname === el.to}
        />
      ))}
    </nav>
  );
}
