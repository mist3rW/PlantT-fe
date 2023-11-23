import { Link } from "react-router-dom";
import { useAuth } from "../hooks/use-auth";

export default function RedirectIfNotAdmin({ children }) {
  const { authUser } = useAuth();

  if (!authUser || authUser.role !== "ADMIN") {
    return (
      <div className="text-center mt-6 space-y-4">
        <p>You are not allowed to access this page.</p>
        <p>Admins only.</p>
        <Link to="/">
          <button className="bg-blue-500 text-white p-2 rounded-md">
            Back to homepage
          </button>
        </Link>
      </div>
    );
  }

  return children;
}
