"use client";
import { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import SOSModal from "../../components/UI/SOSModal";
const Map = dynamic(() => import("../../components/Map/MapContainer"), { ssr: false });

export default function Home() {
  const [open, setOpen] = useState(true);
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [showSOS, setShowSOS] = useState(true);
  const [showRescue, setShowRescue] = useState(false);
  const [showDisaster, setShowDisaster] = useState(false);

  const [showSOSModal, setShowSOSModal] = useState(false);
  // handler nhận payload từ modal
  function handleSOSSubmit(payload: any) {
    console.log("Gửi SOS từ modal:", payload);
    // TODO: gọi API/dispatch action ở đây
    setShowSOSModal(false);
  }

  const provinces = useMemo(
    () => ["Quảng Bình", "Hà Nội", "TP. Hồ Chí Minh"],
    []
  );
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

  // Ví dụ dữ liệu cảnh báo (có thể thay bằng dữ liệu thực tế)
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

  // Bảng tổng quan khu vực (ví dụ dữ liệu tĩnh)
  const overviewDataByProvince: Record<string, { sos: number; rescue: number; flood: number }> = {
    "Quảng Bình": { sos: 128, rescue: 15, flood: 42 },
    "Hà Nội": { sos: 24, rescue: 5, flood: 3 },
    "TP. Hồ Chí Minh": { sos: 8, rescue: 2, flood: 12 },
  };
  
  const overview = overviewDataByProvince[province || "Quảng Bình"];

  return (
    <div className="w-full h-screen">
      {/* Slide bar bên trái */}
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
            className={`w-full flex items-center justify-center gap-2 ${
              open ? "py-3 text-white text-sm" : "py-2"
            } rounded-md bg-red-600 hover:bg-red-700 shadow`}
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
              className="mt-2 w-full p-2 border rounded bg-red-50 text-sm"
              value={province}
              onChange={(e) => {
                setProvince(e.target.value);
                setDistrict("");
              }}
            >
              <option value="">Ví dụ: Quảng Bình</option>
              {provinces.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>

            <div className="mt-3 text-xs text-gray-500 font-medium">Chọn huyện / xã</div>
            <select
              className="mt-2 w-full p-2 border rounded bg-white text-sm"
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              disabled={!province}
            >
              <option value="">Ví dụ: Huyện Lệ Thủy, Xã Tân Hóa</option>
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

      {/* Phần bản đồ bên phải */}
      <div className="flex-1 w-full h-full relative">
        {/* Sử dụng component Map thay cho hình ảnh */}
        <div className="absolute inset-0">
          <div className="w-full h-full">
            <Map />
          </div>
        </div>
        {/* Có thể thêm các overlay, nút, hoặc thông tin trên bản đồ ở đây */}
      {/* AreaOverviewCard nằm ngoài container Map, fixed theo viewport để luôn nổi trên map */}
      <AreaOverviewCard province={province || "Quảng Bình"} data={overview} />
      </div>

      {showSOSModal && (
        <SOSModal
          province={province || "Quảng Bình"}
          district={district}
          onClose={() => setShowSOSModal(false)}
          onSubmit={handleSOSSubmit}
        />
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

/* New small floating overview card */
function AreaOverviewCard({ province, data }: { province: string; data: { sos: number; rescue: number; flood: number } }) {
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
