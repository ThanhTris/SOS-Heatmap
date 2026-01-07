"use client";
import React, { useState, useMemo } from "react";

type SOSPayload = {
  province: string;
  district?: string;
  conditions: Record<string, boolean>;
  adults: number;
  children: number;
  noteMessage: string;
  recording: boolean;
};

export default function SOSModal({
  province,
  district,
  onClose,
  onSubmit,
}: {
  province?: string;
  district?: string;
  onClose: () => void;
  onSubmit: (payload: SOSPayload) => void;
}) {
  const [conditions, setConditions] = useState<Record<string, boolean>>({
    highWater: true,
    lackFood: true,
    injured: false,
    noPower: false,
    childrenOrElderly: false,
    needMedical: false,
  });
  const [adults, setAdults] = useState<number>(2);
  const [children, setChildren] = useState<number>(1);
  const [noteMessage, setNoteMessage] = useState<string>("");
  const [recording, setRecording] = useState<boolean>(false);
  const [touched, setTouched] = useState<boolean>(false);

  const conditionOptions = useMemo(
    () => [
      { key: "highWater", label: "Nước dâng cao" },
      { key: "lackFood", label: "Thiếu lương thực" },
      { key: "injured", label: "Người bị thương" },
      { key: "noPower", label: "Mất điện/liên lạc" },
      { key: "childrenOrElderly", label: "Có trẻ em/người già" },
      { key: "needMedical", label: "Cần y tế gấp" },
    ],
    []
  );

  function toggleCondition(key: string) {
    setConditions((s) => ({ ...s, [key]: !s[key] }));
  }

  const atLeastOneCondition = Object.values(conditions).some(Boolean);
  const totalPeople = adults + children;
  const isValid = atLeastOneCondition && totalPeople > 0;

  function submit() {
    setTouched(true);
    if (!isValid) return;
    const payload: SOSPayload = {
      province: province || "Quảng Bình",
      district,
      conditions,
      adults,
      children,
      noteMessage,
      recording,
    };
    onSubmit(payload);
    onClose();
  }

  return (
    <div className="fixed inset-0 z-2000 flex items-center justify-center">
      {/* overlay nằm dưới content nhưng vẫn trên map/card */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm z-1990" onClick={onClose} />
      <div className="relative z-2000 w-full max-w-2xl bg-white rounded-lg shadow-lg p-6">
        {/* Header modal */}
        <div className="flex items-start justify-between">
          <div>
            <div className="text-red-600 font-semibold">⚠️ XÁC NHẬN GỬI TÍN HIỆU KHẨN CẤP</div>
            <div className="text-xs text-gray-500 mt-1">Hãy cung cấp thêm thông tin để đội cứu hộ chuẩn bị tốt nhất.</div>
            <div className="text-xs text-gray-400 mt-2">Khu vực: {province}{district ? ` • ${district}` : ""}</div>
          </div>
          <button aria-label="Đóng" onClick={onClose} className="text-gray-400 hover:text-gray-600">✕</button>
        </div>

        {/* Danh sách điều kiện */}
        <div className="mt-4 grid grid-cols-2 gap-3">
          {conditionOptions.map((opt) => {
            const on = conditions[opt.key];
            return (
              <button
                key={opt.key}
                onClick={() => { toggleCondition(opt.key); setTouched(true); }}
                className={`flex items-center gap-2 p-2 rounded-xl border ${on ? "bg-blue-50 border-blue-200" : "bg-gray-50 border-gray-200"}`}
                type="button"
              >
                <input readOnly type="checkbox" checked={on} className="pointer-events-none" />
                <div className="text-sm text-left">{opt.label}</div>
              </button>
            );
          })}
        </div>
        
        {/* Số người và ghi chú */}
        <div className="mt-4 grid grid-cols-2 gap-4">
          <div>
            <div className="text-xs text-gray-500">Số lượng người cần cứu</div>
            <div className="flex items-center gap-2 mt-2">
              <div className="text-sm">Người lớn</div>
              <div className="flex items-center gap-2 ml-auto">
                <button onClick={() => setAdults((n) => Math.max(0, n - 1))} className="px-2 py-1 bg-gray-100 rounded">-</button>
                <div className="w-10 text-center">{adults}</div>
                <button onClick={() => setAdults((n) => n + 1)} className="px-2 py-1 bg-gray-100 rounded">+</button>
              </div>
            </div>
            <div className="flex items-center gap-2 mt-3">
              <div className="text-sm">Trẻ em / Người già</div>
              <div className="flex items-center gap-2 ml-auto">
                <button onClick={() => setChildren((n) => Math.max(0, n - 1))} className="px-2 py-1 bg-gray-100 rounded">-</button>
                <div className="w-10 text-center">{children}</div>
                <button onClick={() => setChildren((n) => n + 1)} className="px-2 py-1 bg-gray-100 rounded">+</button>
              </div>
            </div>
          </div>

          <div>
            <div className="text-xs text-gray-500">Ghi âm / Ghi chú (tùy chọn)</div>
            <div className="mt-2 flex flex-col gap-2">
              <textarea value={noteMessage} onChange={(e) => setNoteMessage(e.target.value)} rows={4} className="w-full p-2 border rounded text-sm" placeholder="Mô tả thêm (ví dụ: địa điểm, tình trạng...)"></textarea>
              <div className="flex items-center justify-between gap-2">
                <button
                  onClick={() => setRecording((r) => !r)}
                  className={`flex items-center gap-2 px-3 py-1 rounded ${recording ? "bg-red-100 text-red-600" : "bg-gray-100"}`}
                  type="button"
                >
                  <div className={`w-2 h-2 rounded-full ${recording ? "bg-red-600 animate-pulse" : "bg-gray-500"}`}></div>
                  <div className="text-xs">{recording ? "Đang ghi âm..." : "Nhấn để bắt đầu ghi âm"}</div>
                </button>
                <div className="text-xs text-gray-400">Dự kiến: 30s</div>
              </div>
            </div>
          </div>
        </div>

        {/* Validation message */}
        {!isValid && touched && (
          <div className="mt-4 text-sm text-red-600">
            { !atLeastOneCondition ? "Vui lòng chọn ít nhất một tình trạng." : totalPeople <= 0 ? "Tổng số người phải lớn hơn 0." : null }
          </div>
        )}

        {/* Footer button */}
        <div className="mt-6 flex items-center justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 rounded bg-white border text-sm">Hủy bỏ</button>
          <button onClick={submit} disabled={!isValid} className={`px-4 py-2 rounded text-sm ${isValid ? "bg-pink-600 text-white" : "bg-gray-200 text-gray-400 cursor-not-allowed"}`}>
            GỬI TÍN HIỆU NGAY
          </button>
        </div>
      </div>
    </div>
  );
}
