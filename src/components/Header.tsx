import { useState } from "react";
import { Link } from "react-router-dom";

export default function Header() {
  const [lang, setLang] = useState("EN");

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/70 shadow-sm">
      <div className="max-w-screen-lg mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-xl font-heading tracking-tight text-g-primary">
          Groningen Tours
        </Link>
        <button
          onClick={() => setLang(lang === "EN" ? "NL" : "EN")}
          className="text-sm text-g-muted hover:text-g-ink transition"
        >
          {lang}
        </button>
      </div>
    </header>
  );
}
