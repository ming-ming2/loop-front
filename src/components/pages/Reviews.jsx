import React, { useState, useMemo } from "react";
import {
  Search,
  Star,
  ChevronDown,
  ArrowLeft,
  Filter,
  Calendar,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";
import Layout from "../Layout";

const mockReviews = [
  {
    id: 16,
    type: "received",
    transactionName: "데이터 분석 컨설팅",
    content:
      "데이터 분석의 기초부터 실전까지 체계적으로 설명해주셔서 업무에 큰 도움이 되었습니다. SQL 쿼리 최적화 팁도 유용했어요.",
    date: "2023.12.19",
    reviewer: "임성준",
    reviewerImage: "/api/placeholder/40/40",
    rating: 5,
    transactionDate: "2023.12.17",
  },
  {
    id: 17,
    type: "written",
    transactionName: "프랑스어 기초회화",
    content:
      "발음부터 시작해서 실생활에서 자주 쓰는 표현까지 쉽게 설명해주셨어요. 문화적인 배경도 함께 설명해주셔서 더욱 흥미로웠습니다.",
    date: "2023.12.18",
    reviewer: "박지은",
    reviewerImage: "/api/placeholder/40/40",
    rating: 5,
    transactionDate: "2023.12.16",
  },
  {
    id: 18,
    type: "received",
    transactionName: "요리 클래스",
    content:
      "요리의 기본기부터 플레이팅까지 상세히 알려주셨어요. 재료 손질법과 불조절 요령 등 실용적인 팁을 많이 배웠습니다.",
    date: "2023.12.17",
    reviewer: "최예진",
    reviewerImage: "/api/placeholder/40/40",
    rating: 4,
    transactionDate: "2023.12.15",
  },
  {
    id: 19,
    type: "written",
    transactionName: "재무설계 상담",
    content:
      "현재 상황에 맞는 맞춤형 재무설계를 제시해주셨습니다. 투자 포트폴리오 구성에 대한 조언이 특히 도움됐어요.",
    date: "2023.12.16",
    reviewer: "강현우",
    reviewerImage: "/api/placeholder/40/40",
    rating: 5,
    transactionDate: "2023.12.14",
  },
  {
    id: 20,
    type: "received",
    transactionName: "드로잉 클래스",
    content:
      "기초 스케치부터 채색까지 단계별로 잘 가르쳐주셨습니다. 취미로 그림을 시작하기에 좋은 수업이었어요.",
    date: "2023.12.15",
    reviewer: "이수진",
    reviewerImage: "/api/placeholder/40/40",
    rating: 5,
    transactionDate: "2023.12.13",
  },
  {
    id: 21,
    type: "written",
    transactionName: "캘리그라피 강좌",
    content:
      "붓펜 사용법부터 레터링까지 체계적으로 배울 수 있었어요. 강사님의 피드백이 매우 상세해서 좋았습니다.",
    date: "2023.12.14",
    reviewer: "김동현",
    reviewerImage: "/api/placeholder/40/40",
    rating: 4,
    transactionDate: "2023.12.12",
  },
  {
    id: 22,
    type: "received",
    transactionName: "네일아트 레슨",
    content:
      "기본적인 케어부터 트렌디한 디자인까지 배울 수 있어서 좋았어요. 꼼꼼하게 설명해주셔서 초보자도 쉽게 따라할 수 있었습니다.",
    date: "2023.12.13",
    reviewer: "장미나",
    reviewerImage: "/api/placeholder/40/40",
    rating: 5,
    transactionDate: "2023.12.11",
  },
  {
    id: 23,
    type: "written",
    transactionName: "주식투자 상담",
    content:
      "기본적 분석과 기술적 분석을 균형있게 설명해주셨어요. 장기 투자 전략을 세우는 데 많은 도움이 되었습니다.",
    date: "2023.12.12",
    reviewer: "윤태호",
    reviewerImage: "/api/placeholder/40/40",
    rating: 5,
    transactionDate: "2023.12.10",
  },
  {
    id: 24,
    type: "received",
    transactionName: "퍼스널 컬러 진단",
    content:
      "전문적인 색채 분석을 통해 저에게 어울리는 컬러를 찾을 수 있었어요. 메이크업과 패션 컬러 조합 팁도 유용했습니다.",
    date: "2023.12.11",
    reviewer: "신예은",
    reviewerImage: "/api/placeholder/40/40",
    rating: 5,
    transactionDate: "2023.12.09",
  },
  {
    id: 25,
    type: "written",
    transactionName: "반려견 훈련",
    content:
      "문제 행동 교정에 대한 실질적인 해결방안을 제시해주셨어요. 강아지의 특성을 잘 파악하고 맞춤형으로 조언해주셨습니다.",
    date: "2023.12.10",
    reviewer: "박현석",
    reviewerImage: "/api/placeholder/40/40",
    rating: 4,
    transactionDate: "2023.12.08",
  },
  {
    id: 26,
    type: "received",
    transactionName: "목공예 클래스",
    content:
      "기본적인 도구 사용법부터 안전수칙까지 꼼꼼하게 설명해주셨어요. 실습 위주의 수업이라 더욱 좋았습니다.",
    date: "2023.12.09",
    reviewer: "김태윤",
    reviewerImage: "/api/placeholder/40/40",
    rating: 5,
    transactionDate: "2023.12.07",
  },
  {
    id: 27,
    type: "written",
    transactionName: "인테리어 컨설팅",
    content:
      "공간의 특성을 잘 파악하고 실용적인 인테리어 방안을 제시해주셨어요. 예산 내에서 최적의 솔루션을 찾아주셨습니다.",
    date: "2023.12.08",
    reviewer: "이지원",
    reviewerImage: "/api/placeholder/40/40",
    rating: 5,
    transactionDate: "2023.12.06",
  },
  {
    id: 28,
    type: "received",
    transactionName: "작사/작곡 레슨",
    content:
      "음악 이론부터 실제 작곡까지 단계별로 잘 설명해주셨어요. 개인의 창의성을 존중해주시면서도 전문적인 조언을 해주셔서 좋았습니다.",
    date: "2023.12.07",
    reviewer: "정세훈",
    reviewerImage: "/api/placeholder/40/40",
    rating: 4,
    transactionDate: "2023.12.05",
  },
  {
    id: 29,
    type: "written",
    transactionName: "일본어 회화",
    content:
      "비즈니스 상황에서 쓸 수 있는 실용적인 표현들을 많이 배웠습니다. 발음 교정도 꼼꼼히 해주셔서 실력이 많이 향상됐어요.",
    date: "2023.12.06",
    reviewer: "한유진",
    reviewerImage: "/api/placeholder/40/40",
    rating: 5,
    transactionDate: "2023.12.04",
  },
  {
    id: 30,
    type: "received",
    transactionName: "댄스 레슨",
    content:
      "기초 스텝부터 응용동작까지 체계적으로 가르쳐주셨어요. 개인의 숙련도에 맞춰 난이도를 조절해주셔서 좋았습니다.",
    date: "2023.12.05",
    reviewer: "송재원",
    reviewerImage: "/api/placeholder/40/40",
    rating: 5,
    transactionDate: "2023.12.03",
  },
];

const ReviewCard = ({ review }) => (
  <div className="bg-white rounded-lg p-6 border hover:shadow-md transition-shadow">
    <div className="flex justify-between items-start mb-4">
      <div>
        <h3 className="font-medium mb-1">{review.transactionName}</h3>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <span>{review.transactionDate}</span>
        </div>
      </div>
      <div className="flex items-center gap-1">
        <Star className="w-4 h-4 text-[#00d4b3] fill-current" />
        <span className="font-medium">{review.rating}</span>
      </div>
    </div>

    <p className="text-gray-600 mb-4 line-clamp-3">{review.content}</p>

    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <img
          src={review.reviewerImage}
          alt={review.reviewer}
          className="w-8 h-8 rounded-full"
        />
        <span className="text-sm font-medium">{review.reviewer}</span>
      </div>
      <span className="text-sm text-gray-500">{review.date}</span>
    </div>
  </div>
);

const SortDropdown = ({ currentSort, onSortChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const sortOptions = [
    { value: "latest", label: "최신순" },
    { value: "highest", label: "별점 높은 순" },
    { value: "lowest", label: "별점 낮은 순" },
    { value: "oldest", label: "오래된 순" },
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 bg-white rounded-lg border hover:border-[#00d4b3] transition-colors"
      >
        <span className="text-sm">
          {sortOptions.find((opt) => opt.value === currentSort)?.label}
        </span>
        <ChevronDown className="w-4 h-4" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg py-1 z-10 border">
          {sortOptions.map((option) => (
            <button
              key={option.value}
              className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50"
              onClick={() => {
                onSortChange(option.value);
                setIsOpen(false);
              }}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
const FilterSection = ({
  onFilterChange,
  selectedRating,
  selectedPeriod,
  isOpen,
}) => {
  const StarRating = ({ rating, onRatingChange }) => {
    return (
      <div className="flex items-center mb-6">
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => onRatingChange(star)}
              className="group relative"
            >
              <Star
                className={`w-8 h-8 ${
                  star <= rating
                    ? "text-[#00d4b3] fill-current"
                    : "text-gray-300 hover:text-gray-400"
                } transition-colors`}
              />
              <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                {star}점 이하 보기
              </span>
            </button>
          ))}
          {rating && (
            <span className="ml-2 text-sm text-gray-500">{rating}점 이하</span>
          )}
        </div>
      </div>
    );
  };

  const PeriodFilter = ({ selectedPeriod, onPeriodChange }) => {
    const periods = [
      { days: 7, label: "7일" },
      { days: 30, label: "30일" },
      { days: 90, label: "90일" },
      { days: 365, label: "1년" },
      { days: null, label: "전체" },
    ];

    return (
      <div className="flex items-center mb-6">
        <div className="flex items-center flex-wrap gap-2">
          {periods.map((period) => (
            <button
              key={period.days}
              onClick={() => onPeriodChange(period.days)}
              className={`px-4 py-2 rounded-lg transition-colors text-sm ${
                selectedPeriod === period.days
                  ? "bg-[#00d4b3] text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              } flex items-center gap-1`}
            >
              <span>{period.label}</span>
              {selectedPeriod === period.days && (
                <span className="text-xs">✓</span>
              )}
            </button>
          ))}
        </div>
      </div>
    );
  };

  const handleReset = () => {
    onFilterChange("rating", null);
    onFilterChange("period", null);
  };

  const hasActiveFilters = selectedRating !== null || selectedPeriod !== null;

  if (!isOpen) return null;

  return (
    <div className="bg-white rounded-lg border p-6 mb-6">
      {/* Star Rating Filter */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-medium text-gray-700">별점 필터</h3>
        </div>
        <StarRating
          rating={selectedRating}
          onRatingChange={(rating) => onFilterChange("rating", rating)}
        />
      </div>

      {/* Period Filter */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-medium text-gray-700">기간 필터</h3>
        </div>
        <PeriodFilter
          selectedPeriod={selectedPeriod}
          onPeriodChange={(period) => onFilterChange("period", period)}
        />
      </div>

      {/* Reset Button */}
      {hasActiveFilters && (
        <div className="flex justify-end mt-6 pt-4 border-t">
          <button
            onClick={handleReset}
            className="text-gray-500 hover:text-gray-700 font-medium"
          >
            필터 초기화
          </button>
        </div>
      )}
    </div>
  );
};
const Reviews = () => {
  const [currentSort, setCurrentSort] = useState("latest");
  const [currentPage, setCurrentPage] = useState(1);
  const [reviewType, setReviewType] = useState("received");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRating, setSelectedRating] = useState(null);
  const [selectedPeriod, setSelectedPeriod] = useState(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const itemsPerPage = 6;

  const handleFilterChange = (type, value) => {
    if (type === "rating") {
      setSelectedRating(selectedRating === value ? null : value);
    } else if (type === "period") {
      setSelectedPeriod(selectedPeriod === value ? null : value);
    }
    setCurrentPage(1);
  };

  const filteredAndSortedReviews = useMemo(() => {
    let filtered = mockReviews.filter((review) => review.type === reviewType);

    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (review) =>
          review.transactionName.toLowerCase().includes(searchLower) ||
          review.content.toLowerCase().includes(searchLower) ||
          review.reviewer.toLowerCase().includes(searchLower)
      );
    }

    if (selectedRating) {
      filtered = filtered.filter((review) => review.rating <= selectedRating);
    }

    if (selectedPeriod) {
      const today = new Date();
      const cutoffDate = new Date(today);
      cutoffDate.setDate(today.getDate() - selectedPeriod);

      filtered = filtered.filter((review) => {
        const [year, month, day] = review.date.split(".");
        const reviewDate = new Date(
          2000 + parseInt(year),
          parseInt(month) - 1,
          parseInt(day)
        );
        return reviewDate >= cutoffDate;
      });
    }

    return filtered.sort((a, b) => {
      const [yearA, monthA, dayA] = a.date.split(".");
      const [yearB, monthB, dayB] = b.date.split(".");

      const dateA = new Date(
        2000 + parseInt(yearA),
        parseInt(monthA) - 1,
        parseInt(dayA)
      );
      const dateB = new Date(
        2000 + parseInt(yearB),
        parseInt(monthB) - 1,
        parseInt(dayB)
      );

      switch (currentSort) {
        case "latest":
          return dateB - dateA;
        case "oldest":
          return dateA - dateB;
        case "highest":
          return b.rating - a.rating || dateB - dateA;
        case "lowest":
          return a.rating - b.rating || dateB - dateA;
        default:
          return 0;
      }
    });
  }, [reviewType, searchTerm, selectedRating, selectedPeriod, currentSort]);

  const totalPages = Math.ceil(filteredAndSortedReviews.length / itemsPerPage);
  const currentReviews = filteredAndSortedReviews.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <Layout>
      <div className="min-h-screen pt-4 pb-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4">
          {/* Header */}
          <div className="flex items-center gap-4 py-6">
            <Link to="/dashboard" className="p-2 hover:bg-gray-100 rounded-lg">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="text-2xl font-bold">내 리뷰 전체보기</h1>
          </div>

          {/* Filter and Sort */}
          <div className="mb-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setReviewType("received");
                    setCurrentPage(1);
                  }}
                  className={`px-4 py-2 rounded-lg text-sm font-medium ${
                    reviewType === "received"
                      ? "bg-[#00d4b3] text-white"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  받은 리뷰
                </button>
                <button
                  onClick={() => {
                    setReviewType("written");
                    setCurrentPage(1);
                  }}
                  className={`px-4 py-2 rounded-lg text-sm font-medium ${
                    reviewType === "written"
                      ? "bg-[#00d4b3] text-white"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  작성한 리뷰
                </button>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative flex-1 md:flex-none">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="리뷰 검색..."
                    className="w-full md:w-64 pl-10 pr-8 py-2 rounded-lg border focus:outline-none focus:ring-1 focus:ring-[#00d4b3]"
                  />
                  <Search className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm("")}
                      className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
                <SortDropdown
                  currentSort={currentSort}
                  onSortChange={setCurrentSort}
                />
                <button
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-sm transition-colors ${
                    isFilterOpen
                      ? "border-[#00d4b3] text-[#00d4b3]"
                      : "text-gray-600 hover:border-[#00d4b3]"
                  }`}
                >
                  <Filter className="w-4 h-4" />
                  <span>필터</span>
                </button>
              </div>
            </div>

            <FilterSection
              onFilterChange={handleFilterChange}
              selectedRating={selectedRating}
              selectedPeriod={selectedPeriod}
              isOpen={isFilterOpen}
            />
          </div>

          {/* Reviews Grid */}
          <div className="grid gap-4 mb-8">
            {currentReviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>

          {/* Empty State */}
          {currentReviews.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">표시할 리뷰가 없습니다</p>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-4">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                className="p-2 hover:bg-gray-100 rounded-lg disabled:opacity-50 disabled:hover:bg-transparent"
                disabled={currentPage === 1}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <span className="font-medium">
                페이지 {currentPage} / {totalPages}
              </span>
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                className="p-2 hover:bg-gray-100 rounded-lg disabled:opacity-50 disabled:hover:bg-transparent"
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Reviews;
