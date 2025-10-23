import { Link } from "react-router-dom";

export default function Hotspots() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-200 to-orange-400 p-6 text-center">
      <h1 className="text-3xl font-bold mb-6">Top Groningen Hotspots</h1>
      <ul className="text-left max-w-md mx-auto space-y-4 text-lg">
        <li>🏛️ Martinitoren (Martini Tower)</li>
        <li>🌳 Noorderplantsoen Park</li>
        <li>🖼️ Groninger Museum</li>
        <li>📚 University District</li>
        <li>🛍️ Folkingestraat Shopping Street</li>
      </ul>

      <div className="mt-10 flex justify-center gap-6">
        <Link
          to="/outside-tour"
          className="px-6 py-3 bg-white text-orange-600 font-semibold rounded-lg shadow hover:bg-orange-100 transition"
        >
          ← Outside Tour
        </Link>

        <Link
          to="/city-tour"
          className="px-6 py-3 bg-white text-orange-600 font-semibold rounded-lg shadow hover:bg-orange-100 transition"
        >
          City Tour →
        </Link>
      </div>
    </div>
  );
}
