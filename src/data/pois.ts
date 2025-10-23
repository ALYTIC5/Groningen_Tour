export type POI = {
  name: string;
  coords: [number, number]; // [longitude, latitude]
};

export const POIs: Record<string, POI[]> = {
  Culture: [
    { name: "Groninger Station", coords: [6.5662, 53.2106] },
    { name: "Groninger Museum", coords: [6.5670, 53.2120] },
    { name: "Martini Tower", coords: [6.5687, 53.2194] },
  ],
  Nightlife: [
    { name: "De Drie Gezusters", coords: [6.5665, 53.2181] },
    { name: "Oost", coords: [6.5735, 53.2138] },
    { name: "Simplon", coords: [6.5672, 53.2203] },
  ],
  Coffee: [
    { name: "Black & Bloom", coords: [6.5634, 53.2180] },
    { name: "Koffiestation", coords: [6.5668, 53.2108] },
    { name: "Simon Lévelt", coords: [6.5669, 53.2170] },
  ],
};
