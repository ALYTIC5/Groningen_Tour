import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Chip from "../components/Chip";
import TopNav from "../components/TopNav";
import { MapContainer, TileLayer, Polyline, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import axios from "axios";

const interests = ["Culture", "Nightlife", "Coffee"];

const interestStops: Record<string, [number, number][]> = {
  Culture: [
    [53.2105, 6.5666], // Station
    [53.2113, 6.5634], // Museum
    [53.2194, 6.5680], // Martini Tower
  ],
  Nightlife: [
    [53.2178, 6.5675], // Bar 1
    [53.2171, 6.5640], // Club
    [53.2162, 6.5705], // Late-night cafe
  ],
  Coffee: [
    [53.2185, 6.5679], // Coffee spot 1
    [53.2199, 6.5663], // Coffee spot 2
    [53.2202, 6.5695], // Coffee spot 3
  ],
};

export default function CityTour() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", age: "", interest: "" });
  const [routeCoords, setRouteCoords] = useState<[number, number][]>([]);
  const [loadingRoute, setLoadingRoute] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.name && form.age && form.interest) {
      setSubmitted(true);
    }
  };

  useEffect(() => {
    const fetchRoute = async () => {
      if (!form.interest) return;
      const coords = interestStops[form.interest];
      if (!coords) return;

      setLoadingRoute(true);

      try {
        const res = await axios.post(
          "https://api.openrouteservice.org/v2/directions/foot-walking/geojson",
          {
            coordinates: coords.map(([lng, lat]) => [lat, lng]),
          },
          {
            headers: {
              Authorization: import.meta.env.VITE_ORS_API_KEY as string,
              "Content-Type": "application/json",
            },
          }
        );

        const line = res.data.features[0].geometry.coordinates.map(
          ([lat, lng]: number[]) => [lng, lat] as [number, number]
        );
        setRouteCoords(line);
      } catch (error) {
        console.error("Error fetching route", error);
      } finally {
        setLoadingRoute(false);
      }
    };

    if (submitted) {
      fetchRoute();
    }
  }, [submitted, form.interest]);

  return (
    <>
      <TopNav />
      <div className="p-4 max-w-2xl mx-auto">
        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.form
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              <h1 className="text-2xl font-serif font-semibold">Start City Tour</h1>

              <div>
                <label className="block text-sm font-medium text-g-ink">Name</label>
                <input
                  type="text"
                  required
                  className="w-full mt-1 p-2 rounded-xl border border-g-border bg-g-bg-alt"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-g-ink">Age</label>
                <input
                  type="number"
                  required
                  className="w-full mt-1 p-2 rounded-xl border border-g-border bg-g-bg-alt"
                  value={form.age}
                  onChange={(e) => setForm({ ...form, age: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-g-ink mb-2">Interest</label>
                <div className="flex gap-2 flex-wrap">
                  {interests.map((int) => (
                    <Chip
                      key={int}
                      label={int}
                      isActive={form.interest === int}
                      onClick={() => setForm({ ...form, interest: int })}
                    />
                  ))}
                </div>
              </div>

              <Button type="submit" label="Start Tour" />
            </motion.form>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="text-center">
                <h2 className="text-xl font-serif font-semibold">
                  Hi {form.name}, here’s your {form.interest} tour.
                </h2>
                <p className="text-g-muted mb-4">Scroll down to follow your route on the map.</p>
              </div>

              {loadingRoute ? (
                <p className="text-center text-sm text-g-muted">Loading route...</p>
              ) : (
                <MapContainer
                  center={interestStops[form.interest][0]}
                  zoom={15}
                  scrollWheelZoom={false}
                  className="w-full h-80 rounded-xl z-0"
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; OpenStreetMap contributors'
                  />
                  {routeCoords.length > 0 && (
                    <Polyline positions={routeCoords} color="#f87171" />
                  )}
                  {interestStops[form.interest].map((pos, idx) => (
                    <Marker
                      key={idx}
                      position={pos}
                      icon={L.icon({
                        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
                        iconSize: [25, 41],
                        iconAnchor: [12, 41],
                        popupAnchor: [0, -41],
                      })}
                    >
                      <Popup>Stop {idx + 1}</Popup>
                    </Marker>
                  ))}
                </MapContainer>
              )}

              <Button label="Back to Home" onClick={() => navigate("/")} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
