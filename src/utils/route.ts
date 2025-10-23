import { POI } from "../data/pois";
import Openrouteservice from "openrouteservice-js";

const Directions = new Openrouteservice.Directions({ api_key: "YOUR_API_KEY" });

export async function getOptimizedRoute(
  start: [number, number],
  pois: POI[]
) {
  const coordinates = [start, ...pois.map((poi) => poi.coords)];
  const result = await Directions.calculate({
    coordinates,
    profile: "foot-walking",
    format: "geojson",
  });
  return result;
}
