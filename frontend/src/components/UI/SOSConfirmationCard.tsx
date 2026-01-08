"use client";

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

interface SOSConfirmationCardProps {
  confirmation: SOSConfirmation;
  onClose: () => void;
}

export default function SOSConfirmationCard({ confirmation, onClose }: SOSConfirmationCardProps) {
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
              <div className="text-sm">⏱️</div>
              <div className="font-bold text-sm text-blue-900">THỜI GIAN DỰ KIẾN ĐỘI CỨU HỘ ĐẾN</div>
            </div>
            <div className="text-2xl font-bold text-blue-700 mt-1">~{confirmation.estimatedTime} phút</div>
            <div className="text-xs text-blue-600 mt-2">
              Khoảng cách: {confirmation.distance} km • Đang chuyển động
            </div>

            <div className="mt-2 border-t-2 border-gray-200 w-full space-y-4">
              {/* Responder Info */}
              <div className="flex items-center rounded-lg pt-2">
                <div className="w-12 h-12 mr-2 bg-linear-to-br from-orange-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold">
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-gray-800">{confirmation.responderName}</div>
                  <div className="text-xs text-gray-600">{confirmation.responderUnit}</div>
                </div>
                <button className="text-white px-3 py-1 rounded-full text-sm hover:bg-gray-200 items-end">
                  📞
                </button>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <button className="bg-blue-500 text-white p-2 rounded-lg font-bold text-sm">
                  ✓ Đã tiếp nhận
                </button>
                <button className="bg-white text-gray-700 p-2 rounded-lg font-bold text-sm hover:bg-gray-100">
                  ℹ️ Chi tiết
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="pt-4">
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
