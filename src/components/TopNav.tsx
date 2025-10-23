import { NavLink, useLocation } from "react-router-dom";

const navItems = [
  { name: "City Tour", path: "/city-tour" },
  { name: "Outside Tour", path: "/outside-tour" },
  { name: "Hotspots", path: "/hotspots" },
];

export default function TopNav() {
  const location = useLocation();

  return (
    <div className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-gray-200">
      <div className="max-w-4xl mx-auto flex items-center justify-center gap-8 py-3">
        {navItems.map(({ name, path }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              `text-sm font-medium transition-colors ${
                isActive || location.pathname === path
                  ? "text-blue-600"
                  : "text-gray-500 hover:text-black"
              }`
            }
          >
            {name}
          </NavLink>
        ))}
      </div>
    </div>
  );
}
