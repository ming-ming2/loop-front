import React, { useState } from "react";
import { Star, Plus, Minus, X, ChevronRight } from "lucide-react";

const MapView = () => {
  const [selectedMarker, setSelectedMarker] = useState(null);

  // 더미 마커 데이터
  const markerData = {
    id: 1,
    title: "꼼꼼 튜터",
    rating: 4.7,
    reviews: 97,
    hires: 48,
    experience: "경력 20년",
    description: "고객을 위해 최선을 다하겠습니다",
    profileImage: "/api/placeholder/64/64",
  };

  const MarkerInfoCard = ({ data, onClose }) => (
    <div className="absolute left-1/2 bottom-24 -translate-x-1/2 w-[90%] max-w-md bg-white rounded-lg shadow-lg p-4 z-10">
      <div className="flex items-start gap-4">
        {/* 프로필 이미지 */}
        <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
          <img
            src={data.profileImage}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>

        {/* 정보 */}
        <div className="flex-1">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-bold">{data.title}</h3>
              <div className="flex items-center gap-1 text-sm mt-1">
                <Star className="w-4 h-4 fill-[#00d4b3] text-[#00d4b3]" />
                <span className="font-medium">{data.rating}</span>
                <span className="text-gray-400">
                  ({data.reviews}) · {data.hires}회 고용 · {data.experience}
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <p className="text-gray-600 text-sm mt-2">{data.description}</p>

          <div className="flex items-center justify-between mt-4">
            <button className="text-[#00d4b3] text-sm font-medium flex items-center">
              숨고페이
              <ChevronRight className="w-4 h-4 ml-1" />
            </button>
            <button className="bg-[#00d4b3] text-white px-4 py-1.5 rounded-md text-sm hover:bg-[#00b298] transition-colors">
              로켓 응답
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="relative w-full h-[calc(100vh-var(--header-height))]">
      {/* 지도 영역 (실제 구현 시 네이버/카카오 지도 컴포넌트로 대체) */}
      <div className="w-full h-full bg-gray-100">
        {/* 줌 컨트롤 */}
        <div className="absolute top-4 right-4 bg-white rounded-lg shadow-md">
          <button className="p-2 hover:bg-gray-50 border-b">
            <Plus className="w-5 h-5" />
          </button>
          <button className="p-2 hover:bg-gray-50">
            <Minus className="w-5 h-5" />
          </button>
        </div>

        {/* 거리 표시 */}
        <div className="absolute bottom-4 right-4 bg-white px-2 py-1 rounded text-sm">
          500m
        </div>

        {/* 지도 제공자 표시 */}
        <div className="absolute bottom-4 left-4">
          <span className="text-xs text-gray-500">© NAVER Corp.</span>
        </div>
      </div>

      {/* 마커 정보 카드 */}
      {selectedMarker && (
        <MarkerInfoCard
          data={markerData}
          onClose={() => setSelectedMarker(null)}
        />
      )}

      {/* 마커 클릭 시뮬레이션을 위한 임시 버튼 */}
      <button
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                   w-12 h-12 bg-[#00d4b3] rounded-full text-white flex items-center justify-center
                   shadow-lg border-4 border-white"
        onClick={() => setSelectedMarker(markerData)}
      >
        S
      </button>
    </div>
  );
};

export default MapView;
