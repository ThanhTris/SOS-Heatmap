"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import SOSModal from "../../components/UI/SOSModal";
import Sidebar from "../../components/UI/Sidebar";
const Map = dynamic(() => import("../../components/Map/MapContainer"), { ssr: false });

export default function Home() {
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [showSOSModal, setShowSOSModal] = useState(false);
  // handler nhận payload từ modal
  function handleSOSSubmit(payload: any) {
    console.log("Gửi SOS từ modal:", payload);
    // TODO: gọi API/dispatch action ở đây
    setShowSOSModal(false);
  }

  // Bảng tổng quan khu vực (ví dụ dữ liệu tĩnh)
  const overviewDataByProvince: Record<string, { sos: number; rescue: number; flood: number }> = {
    "Quảng Bình": { sos: 128, rescue: 15, flood: 42 },
    "Hà Nội": { sos: 24, rescue: 5, flood: 3 },
    "TP. Hồ Chí Minh": { sos: 8, rescue: 2, flood: 12 },
  };
  
  const overview = overviewDataByProvince[province || "Quảng Bình"];

  return (
    <div className="flex w-full h-screen">
      {/* Slide bar bên trái (component) */}
      <Sidebar
        province={province}
        setProvince={setProvince}
        district={district}
        setDistrict={setDistrict}
        setShowSOSModal={setShowSOSModal}
      />

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
