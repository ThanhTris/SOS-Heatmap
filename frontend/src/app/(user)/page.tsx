"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import SOSModal from "../../components/UI/SOSModal";
import SOSConfirmationCard from "../../components/UI/SOSConfirmationCard";
import AreaOverviewCard from "../../components/UI/AreaOverviewCard";
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
      if (!payload.province || !payload.district) {
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
             <Map province={province || "Quảng Bình"} />
           </div>
         </div>
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


