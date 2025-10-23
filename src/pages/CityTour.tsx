// src/pages/CityTour.tsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Chip from "../components/Chip";
import TopNav from "../components/TopNav";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import MapView from "../components/MapView";

const interests = ["Culture", "Nightlife", "Coffee"];

const interestStops: Record<string, [number, number][]> = {
  Culture: [
    [53.2115, 6.5644], // Station
    [53.2192, 6.5662], // Museum
    [53.2194, 6.5680], // Martini Tower
  ],
  Nightlife: [
    [53.2196, 6.5670],
    [53.2201, 6.5687],
    [53.2174, 6.5621],
  ],
  Coffee: [
    [53.2180, 6.5670],
    [53.2171, 6.5650],
    [53.2165, 6.5630],
  ],
};

export default function CityTour() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", age: "", interest: "" });
  const [userPos, setUserPos] = useState<[number, number] | null>(null);
  const [routeGeoJSON, setRouteGeoJSON] = useState<any>(null);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.name && form.age && form.interest) {
      console.log("✅ Submitting form with:", form);

      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const coords: [number, number] = [
            pos.coords.latitude,
            pos.coords.longitude,
          ];
          console.log("📍 Location obtained:", coords);
          setUserPos(coords);

          const selectedStops = interestStops[form.interest];
          const fullRoute = [coords, ...selectedStops];

          axios
            .post(
              `https://api.openrouteservice.org/v2/directions/foot-walking/geojson`,
              {
                coordinates: fullRoute.map(([lat, lng]) => [lng, lat]),
              },
              {
                headers: {
                  Authorization: import.meta.env.VITE_ORS_API_KEY,
                  "Content-Type": "application/json",
                },
              }
            )
            .then((res) => {
              console.log("🗺️ Route fetched successfully");
              setRouteGeoJSON(res.data);
              setSubmitted(true);
            })
            .catch((err) => {
              console.error("❌ Route fetch error:", err);
              alert("Could not fetch route. Check the console.");
            });
        },
        (error) => {
          alert(
            "Unable to get location. Please allow location access and try again."
          );
          console.error("❌ Geolocation error:", error.code, error.message);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        }
      );
    }
  };

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
              <h1 className="text-2xl font-serif font-semibold">
                Start City Tour
              </h1>
              <div>
                <label className="block text-sm font-medium text-g-ink">
                  Name
                </label>
                <input
                  type="text"
                  required
                  className="w-full mt-1 p-2 rounded-xl border border-g-border bg-g-bg-alt"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-g-ink">
                  Age
                </label>
                <input
                  type="number"
                  required
                  className="w-full mt-1 p-2 rounded-xl border border-g-border bg-g-bg-alt"
                  value={form.age}
                  onChange={(e) => setForm({ ...form, age: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-g-ink mb-2">
                  Interest
                </label>
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
              key="map"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <h2 className="text-xl font-serif font-semibold">
                Tour for {form.name} ({form.interest})
              </h2>
              {userPos && routeGeoJSON ? (
                <MapView routeGeoJSON={routeGeoJSON} userPos={userPos} />
              ) : (
                <p className="text-g-muted">Loading your route...</p>
              )}
              <Button label="Back to Home" onClick={() => navigate("/")} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
