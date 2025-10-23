import Header from "../components/Header";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="bg-[var(--g-bg)] text-[var(--g-ink)] min-h-screen">
      <Header />

      <main className="pt-20 px-4 max-w-screen-md mx-auto">
        <section className="text-center mb-10">
          <h1 className="text-3xl font-heading mb-2">Welcome to Groningen</h1>
          <p className="text-g-muted">Explore city charm, countryside calm, and local events.</p>
        </section>

        <section className="grid gap-4">
          <Link to="/city-tour" className="block bg-g-blue/10 rounded-2xl p-5 shadow-soft hover:shadow-md transition">
            <h2 className="text-xl font-semibold text-g-blue mb-1">City Tour</h2>
            <p className="text-sm text-g-muted">Walk the vibrant streets of Groningen city.</p>
          </Link>

          <Link to="/outside-tour" className="block bg-g-primary/10 rounded-2xl p-5 shadow-soft hover:shadow-md transition">
            <h2 className="text-xl font-semibold text-g-primary mb-1">Outside the City</h2>
            <p className="text-sm text-g-muted">Discover nature and culture in the province.</p>
          </Link>

          <Link to="/hotspots" className="block bg-g-brick/10 rounded-2xl p-5 shadow-soft hover:shadow-md transition">
            <h2 className="text-xl font-semibold text-g-brick mb-1">Hotspots & Events</h2>
            <p className="text-sm text-g-muted">What's happening around town today.</p>
          </Link>
        </section>

        <section className="mt-12 bg-g-bg-alt rounded-2xl p-5">
          <h3 className="text-lg font-heading mb-2">Why Groningen?</h3>
          <p className="text-sm text-g-muted">
            A historic city with modern energy. Art, music, coffee, biking, canals, and green spaces.
          </p>
        </section>
      </main>
    </div>
  );
}
