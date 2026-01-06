"use client";
import { useEffect, useState } from "react";
import { MapContainer as LeafletMap, TileLayer, Circle, CircleMarker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function FlyToPosition({ position }: { position: [number, number] | null }) {
  const map = useMap();
  useEffect(() => {
    if (position) {
      map.setView(position, 15);
    }
  }, [position, map]);
  return null;
}

export default function Map() {
  const defaultCenter: [number, number] = [16.0, 106.5]; // trung tâm Việt Nam gần Quảng Bình
  const [pos, setPos] = useState<[number, number] | null>(null);
  const [accuracy, setAccuracy] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!("geolocation" in navigator)) {
      setError("Trình duyệt không hỗ trợ Geolocation");
      return;
    }
    const id = navigator.geolocation.watchPosition(
      (p) => {
        setPos([p.coords.latitude, p.coords.longitude]);
        setAccuracy(p.coords.accuracy);
        setError(null);
      },
      (e) => {
        setError(e.message || "Lỗi vị trí");
      },
      { enableHighAccuracy: true, maximumAge: 10000, timeout: 10000 }
    );
    return () => navigator.geolocation.clearWatch(id);
  }, []);

  return (
    <div className="h-full w-full">
      <LeafletMap center={pos || defaultCenter} zoom={6} style={{ height: "100%", width: "100%" }} zoomControl={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {pos && (
          <>
            <FlyToPosition position={pos} />
            <CircleMarker center={pos} radius={8} pathOptions={{ color: "#ff3366", fillColor: "#ff6b88", fillOpacity: 0.9 }}>
              <Popup>Vị trí của bạn</Popup>
            </CircleMarker>
            {accuracy != null && <Circle center={pos} radius={Math.max(accuracy, 10)} pathOptions={{ color: "#ff8fa3", opacity: 0.3 }} />}
          </>
        )}
      </LeafletMap>
      {error && <div className="absolute bottom-4 left-4 bg-white p-2 rounded shadow text-sm text-red-600">{error}</div>}
    </div>
  );
}