import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { FaCar } from "react-icons/fa"; // Example: car icon from react-icons
import { renderToStaticMarkup } from "react-dom/server";

export default function MapView({ data, useToner = false }) {
  const mapRef = useRef(null);
  const markersRef = useRef({}); // store multiple markers

  // Initialize map
  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = L.map("map", {
        center: [33.7, 72.8],
        zoom: 9,
      });

      // Choose tile layer
      if (useToner) {
        L.tileLayer("https://stamen-tiles.a.ssl.fastly.net/toner/{z}/{x}/{y}.png", {
          attribution:
            'Map tiles by <a href="https://stamen.com/">Stamen Design</a>, &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        }).addTo(mapRef.current);
      } else {
        L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(mapRef.current);
      }
    }
  }, [useToner]);

  // Update markers
  useEffect(() => {
    if (data && mapRef.current) {
      const vehicles = Array.isArray(data) ? data : [data];

      vehicles.forEach((vehicle) => {
        const { id, latitude, longitude } = vehicle;

        // Create a DivIcon with React Icon inside
        const iconMarkup = renderToStaticMarkup(
          <div style={{ color: "red", fontSize: "24px" }}>
            <FaCar />
          </div>
        );
        const reactIcon = L.divIcon({
          html: iconMarkup,
          className: "", // remove default marker styles
          iconSize: [24, 24],
          iconAnchor: [12, 12],
        });

        if (!markersRef.current[id]) {
          markersRef.current[id] = L.marker([latitude, longitude], { icon: reactIcon }).addTo(
            mapRef.current
          );
        } else {
          markersRef.current[id].setLatLng([latitude, longitude]);
        }
      });

      // Center map on first vehicle
      const first = vehicles[0];
      if (first) mapRef.current.setView([first.latitude, first.longitude], 13);
    }
  }, [data]);

  return <div id="map" style={{ width: "100%", height: "100%" }}></div>;
}
