import { Link } from "react-router-dom";

export default function MenuItem({ to, title, active }) {
  return (
    <Link to={to}>
      <div>
        <p className={`${active ? "fill-green-700" : "fill-gray-500"}`}>
          {title}
        </p>
      </div>
    </Link>
  );
}
