"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// 👇 IMPORT ĐỘNG QUAN TRỌNG: Tắt SSR cho LeafletMap
const LeafletMap = dynamic(() => import("./LeafletMap"), {
  ssr: false, // Không chạy trên server -> Hết lỗi "window not defined"
  loading: () => (
    <div className="flex items-center justify-center h-full w-full bg-gray-100 text-gray-500">
      Đang tải bản đồ...
    </div>
  ),
});

export default function MapContainerWrapper({ province }: { province: string }) {
  const [pos, setPos] = useState<[number, number] | null>(null);
  const [accuracy, setAccuracy] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(() => {
    if (!("geolocation" in navigator)) {
      return "Trình duyệt không hỗ trợ Geolocation";
    }
    return null;
  });

  useEffect(() => {
    if (!("geolocation" in navigator)) {
      return;
    }

    const id = navigator.geolocation.watchPosition(
      (p) => {
        setPos([p.coords.latitude, p.coords.longitude]);
        setAccuracy(p.coords.accuracy);
        setError(null);
      },
      (e) => {
        console.error("Geolocation error:", e);
        let errorMsg = "Không thể lấy vị trí hiện tại";
        if (e.code === 1) errorMsg = "Vui lòng cấp quyền truy cập vị trí";
        else if (e.code === 2) errorMsg = "Vị trí không khả dụng (Bật GPS)";
        else if (e.code === 3) errorMsg = "Hết thời gian chờ lấy vị trí";
        
        setError(errorMsg);
        setPos(null);
      },
      { enableHighAccuracy: true, maximumAge: 0, timeout: 10000 }
    );

    return () => navigator.geolocation.clearWatch(id);
  }, []);

  return (
    <div className="h-full w-full relative">
      {/* Truyền props xuống cho component con */}
      <LeafletMap pos={pos} accuracy={accuracy} province={province} />

      {/* Hiển thị lỗi nổi lên trên bản đồ */}
      {error && (
        <div className="absolute bottom-4 left-4 bg-white p-2 rounded shadow text-sm text-red-600">
          {error}
        </div>
      )}
    </div>
  );
}