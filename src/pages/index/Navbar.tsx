import icon from "@/assets/icon.svg";
import { Link } from "@/components/link";

function Navbar() {
  return (
    <nav className="bg-white shadow p-1">
      <div className="max-w-7xl mx-auto px-4">
        <Link href="/" className="flex items-center space-x-2">
          <img src={icon} alt="Nefo" className="h-16 w-16" />
          <h1 className="text-xl font-extrabold text-gray-800">Nefo</h1>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
