import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CityTour from "./pages/CityTour";
import OutsideTour from "./pages/OutsideTour";
import Hotspots from "./pages/Hotspots";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/city-tour" element={<CityTour />} />
        <Route path="/outside-tour" element={<OutsideTour />} />
        <Route path="/hotspots" element={<Hotspots />} />
      </Routes>
    </BrowserRouter>
  );
}
