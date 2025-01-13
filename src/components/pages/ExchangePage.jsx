import React, { useState } from "react";
import {
  Search,
  MapPin,
  ChevronDown,
  Star,
  MessageCircle,
  X,
  Clock,
  Filter,
  Grid,
  Map as MapIcon,
  Plus,
  Minus,
  ChevronRight,
} from "lucide-react";

const ExchangePage = () => {
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [showRegionModal, setShowRegionModal] = useState(false);
  const [viewMode, setViewMode] = useState("list");
  const [selectedMarker, setSelectedMarker] = useState(null);

  // 더미 데이터
  const exchangeRequests = [
    {
      id: 1,
      title: "디자인 교환하실 분",
      user: {
        name: "김디자이너",
        rating: 5.0,
        reviews: 20,
        image: "/api/placeholder/56/56",
        location: "서울 강남구",
      },
      providedSkills: ["UI/UX 디자인", "웹디자인", "모바일 디자인"],
      desiredSkills: ["코딩 교육", "React", "JavaScript"],
      availableTime: "주말 가능",
    },
    // ... 더 많은 더미 데이터
  ];

  // 마커 더미 데이터
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

  const SelectionModal = ({ title, options, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end sm:items-center justify-center">
      <div className="bg-white w-full max-w-lg rounded-t-2xl sm:rounded-2xl max-h-[80vh] overflow-hidden">
        <div className="p-4 border-b sticky top-0 bg-white z-10">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-bold">{title}</h3>
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded-full"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          <div className="relative">
            <input
              type="text"
              placeholder={`${title} 검색`}
              className="w-full px-4 py-2.5 pl-10 bg-gray-100 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#00d4b3] focus:bg-white transition-colors"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          </div>
        </div>

        <div className="overflow-y-auto">
          <div className="p-2">
            {options.map((option) => (
              <button
                key={option.id}
                className="w-full px-4 py-3 text-left hover:bg-gray-50 rounded-lg flex items-center justify-between group"
                onClick={onClose}
              >
                <span>{option.name}</span>
                {option.count && (
                  <span className="text-gray-400 text-sm group-hover:text-[#00d4b3]">
                    {option.count.toLocaleString()}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const MarkerInfoCard = ({ data, onClose }) => (
    <div className="absolute left-1/2 bottom-24 -translate-x-1/2 w-[90%] max-w-md bg-white rounded-lg shadow-lg p-4 z-10">
      <div className="flex items-start gap-4">
        <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
          <img
            src="/Logo.png"
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>

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

  const MapView = () => (
    <div className="relative w-full h-[calc(100vh-var(--header-height))]">
      <div className="w-full h-full bg-gray-100">
        <div className="absolute top-4 right-4 bg-white rounded-lg shadow-md">
          <button className="p-2 hover:bg-gray-50 border-b">
            <Plus className="w-5 h-5" />
          </button>
          <button className="p-2 hover:bg-gray-50">
            <Minus className="w-5 h-5" />
          </button>
        </div>

        <div className="absolute bottom-4 right-4 bg-white px-2 py-1 rounded text-sm">
          500m
        </div>

        <div className="absolute bottom-4 left-4">
          <span className="text-xs text-gray-500">© NAVER Corp.</span>
        </div>
      </div>

      {selectedMarker && (
        <MarkerInfoCard
          data={markerData}
          onClose={() => setSelectedMarker(null)}
        />
      )}

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

  const ExchangeCard = ({ exchange }) => (
    <div className="bg-white rounded-lg p-4 hover:shadow-md transition-shadow border">
      <div className="flex gap-4">
        <div className="w-14 h-14 rounded-full overflow-hidden flex-shrink-0 bg-[#e6f7f4]">
          <img
            src="/profile.png"
            alt={exchange.user.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-medium">{exchange.title}</h3>
              <div className="flex items-center gap-1 text-sm">
                <Star className="w-4 h-4 text-[#00d4b3] fill-current" />
                <span className="font-medium">{exchange.user.rating}</span>
                <span className="text-gray-400">
                  · 리뷰 {exchange.user.reviews}
                </span>
              </div>
            </div>
            <button className="flex items-center justify-center w-8 h-8 rounded-full text-[#00d4b3] hover:bg-[#e6f7f4] flex-shrink-0">
              <MessageCircle className="w-5 h-5" />
            </button>
          </div>

          <div className="mt-2 mb-3">
            <h4 className="text-sm font-medium mb-1.5">제공 가능한 스킬</h4>
            <div className="flex flex-wrap gap-1.5">
              {exchange.providedSkills.map((skill, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-[#e6f7f4] text-[#00d4b3] text-xs rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="mb-3">
            <h4 className="text-sm font-medium mb-1.5">선호하는 교환 스킬</h4>
            <div className="flex flex-wrap gap-1.5">
              {exchange.desiredSkills.map((skill, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-500">
            <MapPin className="w-4 h-4" />
            <span>{exchange.user.location}</span>
            <span>·</span>
            <Clock className="w-4 h-4" />
            <span>{exchange.availableTime}</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 mt-32">
      {/* 상단 고정 영역 */}
      <div className="fixed top-0 left-0 right-0 bg-white z-20 border-b mt-16">
        <div className="h-16 flex items-center px-4">
          <h1 className="text-lg font-bold">교환 찾기</h1>
        </div>

        <div className="px-4 py-3">
          <div className="max-w-3xl mx-auto flex items-center gap-3">
            {/* 필터 버튼 */}
            <button
              onClick={() => setShowServiceModal(true)}
              className="px-3 py-1.5 border rounded-full text-sm flex items-center gap-1 hover:border-[#00d4b3]"
            >
              서비스
              <ChevronDown className="w-4 h-4" />
            </button>

            <button
              onClick={() => setShowRegionModal(true)}
              className="px-3 py-1.5 border rounded-full text-sm flex items-center gap-1 hover:border-[#00d4b3]"
            >
              지역
              <ChevronDown className="w-4 h-4" />
            </button>

            {/* 검색바 */}
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="어떤 교환이 필요하세요?"
                className="w-full px-4 py-1.5 pl-9 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#00d4b3] focus:bg-white transition-colors"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>

            {/* 뷰 모드 토글 */}
            <div className="flex items-center gap-1 border rounded-lg p-0.5">
              <button
                onClick={() => setViewMode("list")}
                className={`p-1.5 rounded ${
                  viewMode === "list" ? "bg-gray-100" : ""
                }`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("map")}
                className={`p-1.5 rounded ${
                  viewMode === "map" ? "bg-gray-100" : ""
                }`}
              >
                <MapIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 메인 콘텐츠 */}
      <div className="pt-[4.5rem] pb-6">
        <div className="max-w-3xl mx-auto px-4">
          {viewMode === "list" ? (
            <div className="space-y-4">
              {exchangeRequests.map((exchange) => (
                <ExchangeCard key={exchange.id} exchange={exchange} />
              ))}
            </div>
          ) : (
            <MapView />
          )}
        </div>
      </div>

      {/* 모달 */}
      {showServiceModal && (
        <SelectionModal
          title="서비스 선택"
          options={[
            { id: "all", name: "전체" },
            { id: "design", name: "디자인" },
            { id: "dev", name: "개발" },
            { id: "marketing", name: "마케팅" },
            { id: "language", name: "외국어" },
          ]}
          onClose={() => setShowServiceModal(false)}
        />
      )}
      {showRegionModal && (
        <SelectionModal
          title="지역 선택"
          options={[
            { id: "all", name: "전체 지역" },
            { id: "seoul", name: "서울특별시" },
            { id: "gyeonggi", name: "경기도" },
          ]}
          onClose={() => setShowRegionModal(false)}
        />
      )}
    </div>
  );
};

export default ExchangePage;
