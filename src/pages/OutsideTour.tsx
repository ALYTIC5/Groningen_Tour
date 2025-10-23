import { Link } from "react-router-dom";

export default function OutsideTour() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-200 to-blue-500 p-6 text-center">
      <h1 className="text-3xl font-bold mb-6">Welcome to the Outside Tour</h1>
      <p className="mb-10 text-lg">
        This tour guides you around the outer highlights of Groningen.
      </p>

      <div className="flex justify-center gap-6">
        <Link
          to="/city-tour"
          className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow hover:bg-blue-100 transition"
        >
          Go to City Tour →
        </Link>

        <Link
          to="/hotspots"
          className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow hover:bg-blue-100 transition"
        >
          Go to Hotspots →
        </Link>
      </div>
    </div>
  );
}
