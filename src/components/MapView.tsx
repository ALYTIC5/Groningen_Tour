import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet";
import { LatLngExpression } from "leaflet";

type Props = {
  route: GeoJSON.FeatureCollection;
};

export default function MapView({ route }: Props) {
  const coordinates: LatLngExpression[] = route.features[0].geometry.coordinates.map(
    ([lng, lat]: [number, number]) => [lat, lng]
  );

  return (
    <MapContainer center={coordinates[0]} zoom={15} style={{ height: "400px", borderRadius: "1rem" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Polyline positions={coordinates} color="#d32f2f" />
      {coordinates.map((pos, i) => (
        <Marker position={pos} key={i} />
      ))}
    </MapContainer>
  );
}
