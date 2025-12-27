import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export default function MapView({ data }) {
  const mapRef = useRef(null);
  const markerRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = L.map("map", {
        center: [33.7, 72.8],
        zoom: 9,
      });

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
      }).addTo(mapRef.current);
    }
  }, []);

  useEffect(() => {
    if (data && mapRef.current) {
      const { latitude, longitude } = data;
      if (!markerRef.current) {
        markerRef.current = L.marker([latitude, longitude]).addTo(
          mapRef.current
        );
      } else {
        markerRef.current.setLatLng([latitude, longitude]);
      }
      mapRef.current.setView([latitude, longitude], 13);
    }
  }, [data]);

  return <div id="map" style={{ width: "100%", height: "100%" }}></div>;
}
