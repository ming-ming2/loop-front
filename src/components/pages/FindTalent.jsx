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
} from "lucide-react";

const ExchangePage = () => {
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [showRegionModal, setShowRegionModal] = useState(false);
  const [viewMode, setViewMode] = useState("list"); // 'list' or 'map'

  // 서비스 카테고리 데이터
  const categories = [
    { id: "all", name: "서비스 전체", count: 2480 },
    { id: "lesson", name: "이사/청소", count: 542 },
    { id: "design", name: "설치/수리", count: 321 },
    { id: "it", name: "인테리어", count: 298 },
    { id: "language", name: "외주", count: 156 },
    { id: "health", name: "이벤트/뷰티", count: 432 },
    // ... 추가 카테고리
  ];

  // 모달 컴포넌트
  const SelectionModal = ({ title, options, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end sm:items-center justify-center">
      <div className="bg-white w-full max-w-lg rounded-t-2xl sm:rounded-2xl max-h-[90vh] overflow-hidden">
        <div className="p-4 border-b sticky top-0 bg-white z-10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold">{title}</h3>
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded-full"
            >
              <X className="w-6 h-6 text-gray-500" />
            </button>
          </div>

          {/* 모달 내 검색바 */}
          <div className="relative">
            <input
              type="text"
              placeholder={`${title} 검색하기`}
              className="w-full px-4 py-3 pl-11 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00d4b3] focus:bg-white transition-colors"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>
        </div>

        <div className="overflow-y-auto max-h-[calc(90vh-120px)]">
          <div className="p-2">
            {options.map((option) => (
              <button
                key={option.id}
                className="w-full px-4 py-3 text-left hover:bg-gray-50 rounded-lg flex items-center justify-between group"
                onClick={onClose}
              >
                <span className="font-medium">{option.name}</span>
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

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* 헤더 */}
      <div className="sticky top-16 bg-white z-20 border-b">
        <div className="max-w-3xl mx-auto px-4">
          <div className="py-4">
            <h1 className="text-2xl font-bold mb-4">고수찾기</h1>

            {/* 필터 영역 */}
            <div className="flex flex-col gap-3">
              <div className="flex gap-2">
                <button
                  onClick={() => setShowServiceModal(true)}
                  className="flex-1 px-4 py-2.5 border rounded-lg flex items-center justify-between hover:border-[#00d4b3] bg-white"
                >
                  <span className="text-gray-600">서비스</span>
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                </button>
                <button
                  onClick={() => setShowRegionModal(true)}
                  className="flex-1 px-4 py-2.5 border rounded-lg flex items-center justify-between hover:border-[#00d4b3] bg-white"
                >
                  <span className="text-gray-600">지역</span>
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                </button>
              </div>

              {/* 검색바 */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="어떤 서비스가 필요하세요?"
                  className="w-full px-4 py-3 pl-11 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00d4b3] focus:bg-white transition-colors"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>

              {/* 뷰 모드 & 필터 */}
              <div className="flex items-center justify-between">
                {/* 태그 필터 */}
                <div className="flex gap-2 overflow-x-auto pb-1 hide-scrollbar">
                  {["예약 가능", "평점 높은순", "리뷰 많은순"].map((tag) => (
                    <button
                      key={tag}
                      className="px-3 py-1.5 rounded-full border text-sm whitespace-nowrap hover:border-[#00d4b3] hover:text-[#00d4b3] bg-white"
                    >
                      {tag}
                    </button>
                  ))}
                </div>

                {/* 뷰 모드 토글 */}
                <div className="flex items-center gap-1 border rounded-lg p-1 bg-white">
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
        </div>
      </div>

      {/* 메인 콘텐츠 */}
      <div className="max-w-3xl mx-auto px-4 py-6">
        {viewMode === "list" ? (
          <div className="space-y-4">
            {/* 고수 카드 */}
            {Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex gap-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0 bg-[#e6f7f4]">
                    <img
                      src="/loop-front/profile.png"
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div>
                        <h3 className="font-medium text-lg">NEW BRAIN</h3>
                        <div className="flex items-center gap-1 text-sm">
                          <Star className="w-4 h-4 text-[#00d4b3] fill-current" />
                          <span className="font-medium">5.0</span>
                          <span className="text-gray-400">
                            · 리뷰 20 · 경력 5년
                          </span>
                        </div>
                      </div>
                      <button className="flex items-center justify-center w-10 h-10 rounded-full text-[#00d4b3] hover:bg-[#e6f7f4] flex-shrink-0">
                        <MessageCircle className="w-5 h-5" />
                      </button>
                    </div>
                    <p className="text-gray-600 text-sm line-clamp-2">
                      현 남동구청 평생교육원 강사. 맞춤형 교육 제공, 체계적인
                      커리큘럼으로 진행합니다.
                    </p>
                    <div className="mt-3 flex items-center gap-2 text-sm text-gray-500">
                      <MapPin className="w-4 h-4" />
                      <span>서울 강남구</span>
                      <span>·</span>
                      <Clock className="w-4 h-4" />
                      <span>즉시 가능</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // 지도 뷰
          <div className="bg-gray-100 rounded-lg h-[calc(100vh-280px)] flex items-center justify-center">
            <p className="text-gray-500">지도 뷰가 여기에 표시됩니다</p>
          </div>
        )}
      </div>

      {/* 모달 */}
      {showServiceModal && (
        <SelectionModal
          title="서비스 선택"
          options={categories}
          onClose={() => setShowServiceModal(false)}
        />
      )}
      {showRegionModal && (
        <SelectionModal
          title="지역 선택"
          options={[
            { id: "all", name: "전체 지역", count: 3500 },
            { id: "seoul", name: "서울특별시", count: 1200 },
            { id: "gyeonggi", name: "경기도", count: 800 },
            // ... 추가 지역
          ]}
          onClose={() => setShowRegionModal(false)}
        />
      )}

      {/* 스타일 */}
      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default ExchangePage;
