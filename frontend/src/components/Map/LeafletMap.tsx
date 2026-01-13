"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Circle, CircleMarker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix lỗi icon marker mặc định của Leaflet khi dùng với Webpack/Next.js
// (Thêm đoạn này để hiện icon marker chuẩn nếu cần dùng Marker thường)
const iconUrl = 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png';
const iconRetinaUrl = 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png';
const shadowUrl = 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png';

L.Icon.Default.mergeOptions({
    iconRetinaUrl: iconRetinaUrl,
    iconUrl: iconUrl,
    shadowUrl: shadowUrl,
});

// Component con để di chuyển camera
function FlyToPosition({ position, province }: { position: [number, number] | null; province: string }) {
  const map = useMap();
  useEffect(() => {
    if (!province && position) {
      map.setView(position, 12);
    }
  }, [position, province, map]);
  return null;
}

// Component con để di chuyển camera đến tỉnh
function FlyToProvince({ province }: { province: string }) {
  const map = useMap();
  const provinceCenters: Record<string, [number, number]> = {
    "Quảng Bình": [17.5, 106.5],
    "Hà Nội": [21.0285, 105.8542],
    "TP. Hồ Chí Minh": [10.8231, 106.6297],
  };
  useEffect(() => {
    const center = provinceCenters[province];
    if (center) {
      map.setView(center, 12); // Zoom mức tỉnh cao hơn
    }
  }, [province, map]);
  return null;
}

// Định nghĩa kiểu dữ liệu props nhận vào từ cha
interface LeafletMapProps {
  pos: [number, number] | null;
  accuracy: number | null;
  province: string;
}

const LeafletMap = ({ pos, accuracy, province }: LeafletMapProps) => {
  const defaultCenter: [number, number] = [16.0, 106.5]; // Trung tâm VN

  return (
    <MapContainer 
      center={defaultCenter} 
      zoom={6} 
      style={{ height: "100%", width: "100%" }} 
      zoomControl={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      <FlyToProvince province={province} />
      
      {pos && (
        <>
          <FlyToPosition position={pos} province={province} />
          
          {/* Dấu chấm đỏ vị trí hiện tại */}
          <CircleMarker 
            center={pos} 
            radius={8} 
            pathOptions={{ color: "var(--color-default)", fillColor: "var(--color-default)", fillOpacity: 1, weight: 2 }}
          >
            <Popup>Vị trí của bạn</Popup>
          </CircleMarker>

          {/* Vòng tròn sai số (Accuracy) */}
          {accuracy != null && (
            <Circle 
              center={pos} 
              radius={Math.max(accuracy, 10)} 
              pathOptions={{ color: "var(--color-default)", opacity: 0.3, weight: 1 }} 
            />
          )}
        </>
      )}
    </MapContainer>
  );
};

export default LeafletMap;