"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import SOSModal from "../../components/UI/SOSModal";
import Sidebar from "../../components/UI/Sidebar";
const Map = dynamic(() => import("../../components/Map/MapContainer"), { ssr: false });

interface SOSPayload {
  province: string;
  district: string;
  [key: string]: unknown;
}

interface SOSConfirmation {
  id: string;
  province: string;
  district: string;
  timestamp: Date;
  responderName: string;
  responderUnit: string;
  estimatedTime: number;
  distance: number;
  status: "pending" | "confirmed" | "in_progress";
}

export default function Home() {
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [showSOSModal, setShowSOSModal] = useState(false);
  const [sosConfirmation, setSOSConfirmation] = useState<SOSConfirmation | null>(null);
  
  // handler nhận payload từ modal
  function handleSOSSubmit(payload: SOSPayload) {
    try {
      console.log("Gửi SOS từ modal:", payload);
      // Validate payload
      // if (!payload.province || !payload.district) {
      // Test required
      if (!payload.province) {
        console.error("Missing required fields:", { province: payload.province, district: payload.district });
        return;
      }
      
      // Simulate SOS confirmation response
      const confirmation: SOSConfirmation = {
        id: `SOS-${Date.now()}`,
        province: payload.province as string,
        district: payload.district as string,
        timestamp: new Date(),
        responderName: "Nguyễn Văn A",
        responderUnit: "Đội Cứu Hộ Số 4",
        estimatedTime: 15,
        distance: 2.5,
        status: "pending"
      };
      
      setSOSConfirmation(confirmation);
      setShowSOSModal(false);
    } catch (error) {
      console.error("Error submitting SOS:", error);
    }
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
           onSubmit={(payload) => handleSOSSubmit(payload as SOSPayload)}
         />
       )}

       {sosConfirmation && (
         <SOSConfirmationCard
           confirmation={sosConfirmation}
           onClose={() => setSOSConfirmation(null)}
         />
       )}
     </div>
   );
 }

 function SOSConfirmationCard({ confirmation, onClose }: { confirmation: SOSConfirmation; onClose: () => void }) {
   return (
     <div className="fixed inset-0 bg-black bg-opacity-40 flex items-end z-50 h-full">
       <div className="w-90 bg-white p-6 h-full">
         {/* Header */}
         <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-pink-100 text-pink-600 rounded-full p-2">
            {/* logo */}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M3 12h3l2-6 4 12 2-8 2 4h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            </div>
          <div className="text-lg font-semibold">SOS Heatmap</div>
          </div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
             ✕
           </button>
        </div>

          {/* Confirmation Message */}
         <div className="flex flex-col items-center justify-between gap-2 p-4 bg-red-50 shadow-red-100 shadow-2xs text-center rounded-lg my-6">
             <div className="w-10 h-10 bg-red-500 rounded-full animate-pulse"></div>
             <h2 className="text-lg font-bold">ĐÃ GỬI TÍN HIỆU SOS</h2>
             <p className="text-sm text-gray-600 text-center">Vị trí của bạn đã được ghi nhận. Đội cứu hộ đang đến</p>
         </div>


         {/* Response Time Info */}
         <div className="bg-blue-50 shadow-blue-100 shadow-2xs rounded-lg p-4 mb-6">
           <div className="flex flex-col items-start gap-3">
             <div className="flex">
               <div className="text-2xl">⏱️</div>
               <div className="font-bold text-sm text-blue-900">THỜI GIAN DỰ KIẾN ĐỘI CỨU HỘ ĐẾN</div>
             </div>
             <div className="text-2xl font-bold text-blue-700 mt-1">~{confirmation.estimatedTime} phút</div>
             <div className="text-xs text-blue-600 mt-2">
                 Khoảng cách: {confirmation.distance} km • Đang chuyển động
             </div>

             {/* Responder Info */}
             <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
              <div className="w-12 h-12 bg-linear-to-br from-orange-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold">
              </div>
             <div className="flex-1">
               <div className="font-semibold text-gray-800">{confirmation.responderName}</div>
               <div className="text-xs text-gray-600">{confirmation.responderUnit}</div>
             </div>
             <button className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600">
               📞
             </button>
            </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3">
           <button className="bg-blue-300 text-blue-600 p-3 rounded-lg font-medium">
             ✓ Đã tiếp nhận
           </button>
           <button className="bg-gray-50 text-gray-700 p-3 rounded-lg font-medium hover:bg-gray-100">
             ℹ️ Chi tiết
           </button>
          </div>
          </div>
         </div>           

         {/* Timeline */}
         <div className="border-t pt-4">
           <h3 className="text-sm font-semibold text-gray-700 mb-3">Tiến trình xử lý</h3>
           <div className="space-y-2">
             <div className="flex gap-3">
               <div className="flex flex-col items-center">
                 <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                 <div className="w-0.5 h-8 bg-blue-200"></div>
               </div>
               <div className="pb-4">
                 <div className="text-xs font-semibold text-gray-700">10:45 AM</div>
                 <div className="text-sm text-gray-600">Đội cứu hộ đã nhận được tín hiệu chuyên đến vị trí</div>
               </div>
             </div>
             <div className="flex gap-3">
               <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
               <div>
                 <div className="text-xs font-semibold text-gray-700">Sắp tới</div>
                 <div className="text-sm text-gray-600">Đội cứu hộ sẽ đến nơi</div>
               </div>
             </div>
           </div>
         </div>
       </div>
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
