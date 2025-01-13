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
  ChevronLeft,
} from "lucide-react";

const ExchangePage = () => {
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [showRegionModal, setShowRegionModal] = useState(false);
  const [viewMode, setViewMode] = useState("list");
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // 더미 데이터 확장
  const exchangeRequests = [
    {
      id: 1,
      title: "디자인 교환하실 분",
      user: {
        name: "김디자이너",
        rating: 5.0,
        reviews: 20,
        image: "/loop-front/profile.png",
        location: "서울 강남구",
        experience: "경력 3년",
      },
      providedSkills: ["UI/UX 디자인", "웹디자인", "모바일 디자인"],
      desiredSkills: ["코딩 교육", "React", "JavaScript"],
      availableTime: "주말 가능",
      description:
        "UI/UX 디자인 작업 가능합니다. 웹사이트 디자인을 코딩 교육과 교환하고 싶어요.",
    },
    {
      id: 2,
      title: "영어 회화 교환해요",
      user: {
        name: "스피킹마스터",
        rating: 4.8,
        reviews: 15,
        image: "/loop-front/profile.png",
        location: "서울 송파구",
        experience: "경력 5년",
      },
      providedSkills: ["비즈니스 영어", "토익 스피킹", "영작문"],
      desiredSkills: ["스페인어", "중국어"],
      availableTime: "평일 저녁",
      description:
        "현직 영어강사입니다. 영어 회화를 다른 외국어와 교환하고 싶습니다.",
    },
    {
      id: 3,
      title: "개발 멘토링 교환",
      user: {
        name: "코드마스터",
        rating: 4.9,
        reviews: 32,
        image: "/loop-front/profile.png",
        location: "서울 마포구",
        experience: "경력 7년",
      },
      providedSkills: ["React", "Node.js", "TypeScript"],
      desiredSkills: ["디자인 기초", "Figma", "UI 디자인"],
      availableTime: "상시가능",
      description: "프론트엔드 개발자입니다. 디자인 스킬을 배우고 싶어요.",
    },
    {
      id: 4,
      title: "마케팅 노하우 공유",
      user: {
        name: "그로스해커",
        rating: 4.7,
        reviews: 25,
        image: "/loop-front/profile.png",
        location: "서울 서초구",
        experience: "경력 4년",
      },
      providedSkills: ["디지털 마케팅", "SNS 마케팅", "콘텐츠 기획"],
      desiredSkills: ["영상편집", "모션그래픽"],
      availableTime: "주말 오전",
      description: "마케팅 전략 수립과 실행 노하우를 공유합니다.",
    },
    {
      id: 5,
      title: "사진 촬영 교환",
      user: {
        name: "포토그래퍼",
        rating: 4.6,
        reviews: 18,
        image: "/loop-front/profile.png",
        location: "서울 용산구",
        experience: "경력 2년",
      },
      providedSkills: ["제품 사진", "인물 사진", "풍경 사진"],
      desiredSkills: ["라이트룸", "포토샵"],
      availableTime: "평일 오후",
      description: "상업용 사진 촬영 가능합니다. 편집 기술을 배우고 싶어요.",
    },
    {
      id: 6,
      title: "요리 레시피 교환",
      user: {
        name: "셰프킴",
        rating: 4.9,
        reviews: 40,
        image: "/loop-front/profile.png",
        location: "서울 중구",
        experience: "경력 8년",
      },
      providedSkills: ["한식", "양식", "디저트"],
      desiredSkills: ["식품 스타일링", "요리 사진"],
      availableTime: "평일 오전",
      description: "현직 셰프입니다. 요리 사진 촬영법을 배우고 싶어요.",
    },
  ];

  // 현재 페이지의 데이터만 필터링
  const currentItems = exchangeRequests.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(exchangeRequests.length / itemsPerPage);

  const SelectionModal = ({ title, options, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end sm:items-center justify-center">
      <div className="bg-white w-full max-w-lg rounded-t-2xl sm:rounded-2xl max-h-[80vh] overflow-hidden mt-16">
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

  const ExchangeCard = ({ exchange }) => (
    <div className="bg-white rounded-lg p-4 hover:shadow-md transition-shadow border">
      <div className="flex gap-4">
        <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0 bg-[#e6f7f4]">
          <img
            src="/loop-front/profile.png"
            alt={exchange.user.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div>
              <h3 className="font-medium text-lg">{exchange.title}</h3>
              <div className="flex items-center gap-1 text-sm">
                <Star className="w-4 h-4 text-[#00d4b3] fill-current" />
                <span className="font-medium">{exchange.user.rating}</span>
                <span className="text-gray-400">
                  · 리뷰 {exchange.user.reviews} · {exchange.user.experience}
                </span>
              </div>
            </div>
            <button className="flex items-center justify-center w-10 h-10 rounded-full text-[#00d4b3] hover:bg-[#e6f7f4] flex-shrink-0">
              <MessageCircle className="w-5 h-5" />
            </button>
          </div>

          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {exchange.description}
          </p>

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

  const Pagination = () => (
    <div className="flex justify-center items-center gap-2 mt-8">
      <button
        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        disabled={currentPage === 1}
        className="p-2 rounded-lg border hover:border-[#00d4b3] disabled:opacity-50 disabled:hover:border-gray-200"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => setCurrentPage(page)}
          className={`w-8 h-8 rounded-lg flex items-center justify-center ${
            currentPage === page
              ? "bg-[#00d4b3] text-white"
              : "border hover:border-[#00d4b3]"
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
        disabled={currentPage === totalPages}
        className="p-2 rounded-lg border hover:border-[#00d4b3] disabled:opacity-50 disabled:hover:border-gray-200"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 pt-8">
      {/* 상단 고정 영역 */}
      <div className="fixed top-16 left-0 right-0 bg-white z-20 border-b">
        <div className="px-4 py-3">
          <div className="max-w-3xl mx-auto flex items-center gap-3">
            {/* 필터 버튼 */}
            <button
              onClick={() => setShowServiceModal(true)}
              className="px-4 py-2 border rounded-lg text-sm flex items-center gap-2 hover:border-[#00d4b3] bg-white min-w-[100px]"
            >
              <span className="text-gray-600">서비스</span>
              <ChevronDown className="w-4 h-4" />
            </button>

            <button
              onClick={() => setShowRegionModal(true)}
              className="px-4 py-2 border rounded-lg text-sm flex items-center gap-2 hover:border-[#00d4b3] bg-white min-w-[100px]"
            >
              <span className="text-gray-600">지역</span>
              <ChevronDown className="w-4 h-4" />
            </button>

            {/* 검색바 */}
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="어떤 교환이 필요하세요?"
                className="w-full px-4 py-2 pl-10 bg-gray-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#00d4b3] focus:bg-white transition-colors"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>

            {/* 뷰 모드 토글 */}
            <div className="flex items-center gap-1 border rounded-lg p-0.5">
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded ${
                  viewMode === "list" ? "bg-gray-100" : ""
                }`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("map")}
                className={`p-2 rounded ${
                  viewMode === "map" ? "bg-gray-100" : ""
                }`}
              >
                <MapIcon className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* 태그 필터 */}
          <div className="max-w-3xl mx-auto mt-3 flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
            {[
              "최신순",
              "인기순",
              "평점순",
              "리뷰 많은순",
              "즉시 가능",
              "주말 가능",
            ].map((tag) => (
              <button
                key={tag}
                className="px-3 py-1.5 rounded-full border text-sm whitespace-nowrap hover:border-[#00d4b3] hover:text-[#00d4b3] bg-white"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 메인 콘텐츠 */}
      <div className="pt-36 pb-6 mt-8">
        <div className="max-w-3xl mx-auto px-4">
          {viewMode === "list" ? (
            <>
              <div className="space-y-4">
                {currentItems.map((exchange) => (
                  <ExchangeCard key={exchange.id} exchange={exchange} />
                ))}
              </div>
              <Pagination />
            </>
          ) : (
            <div className="bg-gray-100 rounded-lg h-[calc(100vh-280px)] flex items-center justify-center">
              <p className="text-gray-500">지도 뷰가 여기에 표시됩니다</p>
            </div>
          )}
        </div>
      </div>

      {/* 모달 */}
      {showServiceModal && (
        <SelectionModal
          title="서비스 선택"
          options={[
            { id: "all", name: "전체", count: 2480 },
            { id: "design", name: "디자인", count: 450 },
            { id: "dev", name: "개발", count: 380 },
            { id: "marketing", name: "마케팅", count: 320 },
            { id: "language", name: "외국어", count: 280 },
            { id: "photo", name: "사진/영상", count: 250 },
            { id: "music", name: "음악", count: 220 },
            { id: "sports", name: "운동/스포츠", count: 200 },
            { id: "cooking", name: "요리", count: 180 },
            { id: "art", name: "미술", count: 160 },
          ]}
          onClose={() => setShowServiceModal(false)}
        />
      )}
      {showRegionModal && (
        <SelectionModal
          title="지역 선택"
          options={[
            { id: "all", name: "전체 지역", count: 2480 },
            { id: "seoul", name: "서울특별시", count: 1200 },
            { id: "gyeonggi", name: "경기도", count: 800 },
            { id: "incheon", name: "인천광역시", count: 200 },
            { id: "busan", name: "부산광역시", count: 150 },
            { id: "daegu", name: "대구광역시", count: 130 },
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
