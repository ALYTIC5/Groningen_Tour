import { useEffect, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  useMap,
  ZoomControl,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.locatecontrol/dist/L.Control.Locate.min.css";
import "leaflet.locatecontrol";

// Fix missing marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// Custom purple marker (optional)
const purpleMarker = new L.Icon({
  iconUrl: "/assets/icons/purple-pin.svg", // Replace with your pin asset
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

interface MapViewProps {
  coordinates: [number, number][];
}

function LiveLocateControl() {
  const map = useMap();

  useEffect(() => {
    const control = L.control
      .locate({
        position: "topright",
        flyTo: true,
        keepCurrentZoomLevel: true,
        drawCircle: true,
        showPopup: false,
        strings: {
          title: "Show my location",
        },
      })
      .addTo(map);

    control.start(); // Automatically start tracking on load

    return () => {
      control.stop();
    };
  }, [map]);

  return null;
}

export default function MapView({ coordinates }: MapViewProps) {
  const mapRef = useRef<L.Map | null>(null);

  const center =
    coordinates.length > 0 ? coordinates[0] : [53.2194, 6.5665]; // Default: Groningen

  return (
    <div className="w-full h-[70vh] rounded-xl overflow-hidden sm:h-[60vh] md:h-[50vh]">
      <MapContainer
        center={center}
        zoom={15}
        scrollWheelZoom={true}
        ref={(ref) => {
          mapRef.current = ref ?? null;
        }}
        zoomControl={false}
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <ZoomControl position="bottomright" />
        <LiveLocateControl />

        {coordinates.map((coord, idx) => (
          <Marker key={idx} position={coord} icon={purpleMarker} />
        ))}

        {coordinates.length > 1 && (
          <Polyline positions={coordinates} color="purple" weight={4} />
        )}
      </MapContainer>
    </div>
  );
}
