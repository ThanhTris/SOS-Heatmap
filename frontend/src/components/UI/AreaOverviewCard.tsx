"use client";
import { useState } from "react";

interface AreaOverviewCardProps {
  province: string;
  data: {
    sos: number;
    rescue: number;
    flood: number;
  };
}

export default function AreaOverviewCard({ province, data }: AreaOverviewCardProps) {
  const [open, setOpen] = useState(true);

  if (!open) {
    return (
      <div className="fixed top-4 right-4 z-1000">
        <button
          onClick={() => setOpen(true)}
          className="bg-white rounded-full shadow p-3 text-sm"
          aria-label="Mở tổng quan khu vực"
        >
          Tổng quan
        </button>
      </div>
    );
  }

  return (
    <div className="fixed top-4 right-4 z-1000 w-64 bg-white rounded-lg shadow-lg p-3 text-sm">
      {/* Floating overview card */}
      <div className="flex items-start justify-between">
        <div>
          <div className="font-semibold">Tổng quan khu vực</div>
          <div className="text-xs text-gray-500">{province}</div>
        </div>
        <button onClick={() => setOpen(false)} className="text-gray-400 hover:text-gray-600" aria-label="Thu nhỏ">
          ✕
        </button>
      </div>

      {/* Card content */}
      <div className="mt-3 space-y-2">
        <div className="flex items-center justify-between">
          <div className="text-xs text-gray-600">Tín hiệu SOS chưa xử lý</div>
          <div className="bg-red-50 text-red-700 px-2 py-0.5 rounded-full text-sm font-medium">{data.sos}</div>
        </div>
        <div className="flex items-center justify-between">
          <div className="text-xs text-gray-600">Đội cứu hộ hoạt động</div>
          <div className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full text-sm font-medium">{data.rescue}</div>
        </div>
        <div className="flex items-center justify-between">
          <div className="text-xs text-gray-600">Điểm ngập sâu</div>
          <div className="bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full text-sm font-medium">{data.flood}</div>
        </div>
      </div>
    </div>
  );
}
