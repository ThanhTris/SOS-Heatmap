"use client";
import { useState } from "react";

type Props = {
  province: string;
  setProvince: (p: string) => void;
  district: string;
  setDistrict: (d: string) => void;
  setShowSOSModal: (v: boolean) => void;
};

export default function Sidebar({ province, setProvince, district, setDistrict, setShowSOSModal }: Props) {
  const [open, setOpen] = useState(true);
  const [showSOS, setShowSOS] = useState(true);
  const [showRescue, setShowRescue] = useState(false);
  const [showDisaster, setShowDisaster] = useState(false);

  const provinces = ["Quảng Bình", "Hà Nội", "TP. Hồ Chí Minh"];
  const districtsByProvince: Record<string, string[]> = {
    "Quảng Bình": ["Huyện Lệ Thủy", "Xã Tân Hóa", "Thị trấn Đồng Hới"],
    "Hà Nội": ["Quận Ba Đình", "Quận Hoàn Kiếm"],
    "TP. Hồ Chí Minh": ["Quận 1", "Quận 3"],
  };

  type Alert = {
    id: string;
    title: string;
    desc: string;
    tag?: string;
    location?: string;
    time?: string;
    severity?: "danger" | "warning" | "info";
  };

  const alerts: Alert[] = [
    {
      id: "a1",
      title: "Kêu cứu: Nước ngập mái nhà",
      desc: "Gia đình có 2 người già và trẻ nhỏ, nước dâng nhanh, không còn lương thực.",
      tag: "Khẩn cấp",
      location: "Xóm 3, Tân Hóa",
      time: "Vừa xong",
      severity: "danger",
    },
    {
      id: "a2",
      title: "Cảnh báo lũ quét cấp 3",
      desc: "Mực nước sông tăng nhanh, nguy cơ lũ quét tại vùng ven suối.",
      tag: "Cảnh báo",
      location: "Huyện Lệ Thủy",
      time: "10p trước",
      severity: "warning",
    },
    {
      id: "a3",
      title: "Đội cứu hộ đang di chuyển",
      desc: "Đội cứu hộ số 5 đang trên đường đến hỗ trợ khu vực ngập nặng.",
      tag: "Hoàn thành",
      location: "Quảng Bình",
      time: "15p trước",
      severity: "info",
    },
  ];

  return (
    <div
      className={`h-full bg-white border-r border-gray-200 flex flex-col p-4 transition-all duration-300 ${
        open ? "w-90" : "w-20"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-pink-100 text-pink-600 rounded-full p-2">
            {/* logo */}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M3 12h3l2-6 4 12 2-8 2 4h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          {open && <div className="text-lg font-semibold">SOS Heatmap</div>}
        </div>
        <button
          aria-label="Toggle sidebar"
          className="p-1 rounded hover:bg-gray-100"
          onClick={() => setOpen((s) => !s)}
        >
          {/* toggle icon */}
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d={open ? "M19 12H5" : "M5 6h14M5 18h14"} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
          </svg>
        </button>
      </div>

      {/* SOS button */}
      <div className="mt-4">
        <button
          className={`w-full flex items-center justify-center gap-2 ${open ? "py-3 text-white text-sm" : "py-2"} rounded-md bg-red-600 hover:bg-red-700 shadow`}
          onClick={() => setShowSOSModal(true)}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="transform -translate-y-0.5">
            <path d="M12 2v6" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="12" cy="14" r="6" stroke="white" strokeWidth="1.6"/>
          </svg>
          {open && <span className="font-semibold">GỬI TÍN HIỆU SOS</span>}
        </button>
      </div>

      {/* Controls */}
      {open && (
        <>
          <div className="mt-4 text-xs text-gray-500 font-medium">Chọn tỉnh / thành phố</div>
          <select
            className="mt-2 w-full p-2 border rounded bg-red-50 text-sm text-gray-300"
            value={province}
            onChange={(e) => {
              setProvince(e.target.value);
              setDistrict("");
            }}
          >
            <option value="">Tỉnh / thành phố</option>
            {provinces.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>

          <div className="mt-3 text-xs text-gray-500 font-medium">Chọn huyện / xã</div>
          <select
            className="mt-2 w-full p-2 border rounded bg-red-50 text-sm text-gray-300"
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
            disabled={!province}
          >
            <option value="">Huyện / xã</option>
            {(districtsByProvince[province] || []).map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>

          {/* Các options toggle */}
          <div className="mt-4 text-sm font-semibold text-gray-700">HIỂN THỊ TRÊN BẢN ĐỒ</div>
          <div className="mt-2 space-y-2">
            <ToggleRow label="Tín hiệu SOS" checked={showSOS} onChange={setShowSOS} />
            <ToggleRow label="Đội cứu hộ" checked={showRescue} onChange={setShowRescue} />
            <ToggleRow label="Cảnh báo thiên tai" checked={showDisaster} onChange={setShowDisaster} />
          </div>

          <div className="mt-6 flex items-center justify-between text-sm font-medium text-gray-600">
            <div className="text-sm font-semibold text-gray-700">CẬP NHẬT THỜI GIAN THỰC</div>
            <button className="text-pink-600 hover:text-pink-700 text-sm flex items-center gap-2 p-1 rounded-3xl bg-red-50">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M21 12a9 9 0 10-3 6.6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M21 12v-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Làm mới
            </button>
          </div>

          <div className="mt-3 overflow-y-auto flex-1 pr-2">
            <div className="space-y-3">
              {alerts.map((a) => (
                <button key={a.id} className={`border-l-4 border-red-500 rounded-md p-3 bg-white shadow-sm ${
                  a.tag == "Khẩn cấp" ? "border-red-500" : a.tag == "Cảnh báo" ? "border-yellow-500" : "border-green-500"}`}>
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div className="font-semibold text-sm">{a.title}</div>
                        <div className="text-xs text-gray-400">{a.time}</div>
                      </div>
                      <div className="text-xs text-gray-600 mt-2 text-start">{a.desc}</div>
                      <div className="mt-3 flex items-center gap-2 text-xs">
                        {a.tag == "Khẩn cấp" && <span className="bg-red-100 text-red-700 px-2 py-0.5 rounded">{a.tag}</span>}
                        {a.tag == "Cảnh báo" && <span className="bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded">{a.tag}</span>}
                        {a.location && <span className="text-gray-500">• {a.location}</span>}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

/* Small ToggleRow component kept inside file for brevity */
function ToggleRow({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void; }) {
  return (
    <div className="flex items-center justify-between">
      <div className="text-sm text-gray-700">{label}</div>
      <button
        aria-pressed={checked}
        onClick={() => onChange(!checked)}
        className={`w-12 h-6 flex items-center p-1 rounded-full transition-colors ${checked ? "bg-pink-600" : "bg-gray-200"}`}
      >
        <div className={`bg-white w-4 h-4 rounded-full shadow transform transition-transform ${checked ? "translate-x-6" : ""}`}></div>
      </button>
    </div>
  );
}
