import React, { useState, useMemo, useEffect } from "react";
import {
  Search,
  Star,
  ChevronDown,
  ChevronRight,
  MapPin,
  Clock,
  X,
} from "lucide-react";
import { useSearchParams } from "react-router-dom";
import Layout from "../Layout";
import ScrollToTop from "../ScrollToTop";
import { CATEGORIES_DATA, DUMMY_SKILLS } from "../mocks/categoriesData";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const maxPageNumbers = 5;
  const pageNumbers = [];

  let startPage = Math.max(1, currentPage - Math.floor(maxPageNumbers / 2));
  let endPage = Math.min(totalPages, startPage + maxPageNumbers - 1);

  if (endPage - startPage + 1 < maxPageNumbers) {
    startPage = Math.max(1, endPage - maxPageNumbers + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex justify-center items-center space-x-2 mt-8 mb-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-3 py-2 rounded transition-colors ${
          currentPage === 1
            ? "text-gray-400 cursor-not-allowed"
            : "text-gray-700 hover:bg-gray-100"
        }`}
      >
        이전
      </button>

      <div className="flex space-x-1">
        {startPage > 1 && (
          <>
            <button
              onClick={() => onPageChange(1)}
              className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100"
            >
              1
            </button>
            {startPage > 2 && (
              <span className="w-8 h-8 flex items-center justify-center">
                ...
              </span>
            )}
          </>
        )}

        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => onPageChange(number)}
            className={`w-8 h-8 flex items-center justify-center rounded transition-colors ${
              currentPage === number
                ? "bg-[#00d4b3] text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            {number}
          </button>
        ))}

        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && (
              <span className="w-8 h-8 flex items-center justify-center">
                ...
              </span>
            )}
            <button
              onClick={() => onPageChange(totalPages)}
              className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100"
            >
              {totalPages}
            </button>
          </>
        )}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-3 py-2 rounded transition-colors ${
          currentPage === totalPages
            ? "text-gray-400 cursor-not-allowed"
            : "text-gray-700 hover:bg-gray-100"
        }`}
      >
        다음
      </button>
    </div>
  );
};

const CategoriesPage = () => {
  const [searchParams] = useSearchParams();
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [expandedSubCategory, setExpandedSubCategory] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [sortOption, setSortOption] = useState("평점 높은순");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const itemsPerPage = 12;

  // 창 크기 변경 감지 및 메뉴 닫기
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // 모바일 메뉴 열렸을 때 스크롤 방지
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "unset";
      };
    }
  }, [isMobileMenuOpen]);

  // URL 파라미터로부터 초기 카테고리 설정
  useEffect(() => {
    const categoryFromUrl = searchParams.get("category");
    if (categoryFromUrl && categoryFromUrl !== "all") {
      setSelectedCategory(categoryFromUrl);
      setExpandedCategory(categoryFromUrl);
    }
  }, [searchParams]);

  // 필터링된 스킬 목록
  const filteredSkills = useMemo(() => {
    let filtered = [...DUMMY_SKILLS];

    if (searchQuery) {
      filtered = filtered.filter(
        (skill) =>
          skill.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          skill.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          skill.tags.some((tag) =>
            tag.toLowerCase().includes(searchQuery.toLowerCase())
          )
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter(
        (skill) => skill.category === selectedCategory
      );

      if (selectedSubCategory) {
        filtered = filtered.filter(
          (skill) => skill.subCategory === selectedSubCategory
        );

        if (selectedSkill) {
          filtered = filtered.filter((skill) => skill.skill === selectedSkill);
        }
      }
    }

    switch (sortOption) {
      case "평점 높은순":
        filtered.sort((a, b) => b.user.rating - a.user.rating);
        break;
      case "리뷰 많은순":
        filtered.sort((a, b) => b.user.reviews - a.user.reviews);
        break;
      case "최근 등록순":
        filtered.sort((a, b) => b.id - a.id);
        break;
      default:
        break;
    }

    return filtered;
  }, [
    selectedCategory,
    selectedSubCategory,
    selectedSkill,
    sortOption,
    searchQuery,
  ]);

  // 현재 페이지의 아이템들
  const currentItems = useMemo(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return filteredSkills.slice(indexOfFirstItem, indexOfLastItem);
  }, [filteredSkills, currentPage]);

  // 총 페이지 수
  const totalPages = Math.ceil(filteredSkills.length / itemsPerPage);

  // 필터 변경 시 페이지 리셋
  useEffect(() => {
    setCurrentPage(1);
  }, [
    selectedCategory,
    selectedSubCategory,
    selectedSkill,
    searchQuery,
    sortOption,
  ]);

  const handleCategorySelect = (categoryId) => {
    if (selectedCategory === categoryId) {
      setSelectedCategory(null);
      setSelectedSubCategory(null);
      setSelectedSkill(null);
      setExpandedCategory(null);
    } else {
      setSelectedCategory(categoryId);
      setSelectedSubCategory(null);
      setSelectedSkill(null);
      setExpandedCategory(categoryId);
    }

    if (window.innerWidth < 768) {
      setIsMobileMenuOpen(false);
    }

    const cardSection = document.getElementById("card-section");
    if (cardSection) {
      cardSection.scrollTop = 0;
    }
  };

  const handleSubCategorySelect = (subCategoryName) => {
    if (selectedSubCategory === subCategoryName) {
      setSelectedSubCategory(null);
      setSelectedSkill(null);
      setExpandedSubCategory(null);
    } else {
      setSelectedSubCategory(subCategoryName);
      setSelectedSkill(null);
      setExpandedSubCategory(subCategoryName);
    }

    if (window.innerWidth < 768) {
      setIsMobileMenuOpen(false);
    }

    const cardSection = document.getElementById("card-section");
    if (cardSection) {
      cardSection.scrollTop = 0;
    }
  };

  const handleSkillSelect = (skillName) => {
    setSelectedSkill(selectedSkill === skillName ? null : skillName);

    if (window.innerWidth < 768) {
      setIsMobileMenuOpen(false);
    }

    const cardSection = document.getElementById("card-section");
    if (cardSection) {
      cardSection.scrollTop = 0;
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);

    const cardSection = document.getElementById("card-section");
    if (cardSection) {
      cardSection.scrollTop = 0;
    }
  };
  return (
    <Layout>
      <ScrollToTop />
      {/* 검색 및 필터 영역 */}
      <div className="sticky top-[var(--header-height)] bg-white z-10 border-b">
        <div className="max-w-3xl mx-auto px-4">
          {/* 검색바 */}
          <div className="py-3">
            <div className="relative">
              <input
                type="text"
                placeholder="어떤 재능을 찾고 계신가요?"
                className="w-full px-4 py-2.5 pl-10 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00d4b3] focus:bg-white transition-colors"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
          </div>

          {/* 모바일 필터 버튼 */}
          <div className="flex items-center gap-2 pb-3 overflow-x-auto hide-scrollbar md:hidden">
            <button
              className={`px-3 py-1.5 text-sm border rounded-full flex items-center gap-1 whitespace-nowrap transition-colors
                        ${
                          isMobileMenuOpen
                            ? "border-[#00d4b3] text-[#00d4b3]"
                            : "hover:border-[#00d4b3]"
                        }`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              카테고리
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${
                  isMobileMenuOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            <button className="px-3 py-1.5 text-sm border rounded-full hover:border-[#00d4b3] flex items-center gap-1 whitespace-nowrap">
              지역
              <ChevronDown className="w-4 h-4" />
            </button>
            <button className="px-3 py-1.5 text-sm border rounded-full hover:border-[#00d4b3] flex items-center gap-1 whitespace-nowrap">
              평점
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 메인 콘텐츠 */}
      <div className="max-w-3xl mx-auto px-4 relative">
        {/* 모바일 카테고리 메뉴 오버레이 */}
        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-20 overscroll-none"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}

        <div className="grid md:grid-cols-12 gap-6">
          {/* 카테고리 사이드바 */}
          <div
            className={`
            md:col-span-4
            ${
              isMobileMenuOpen
                ? "fixed inset-0 z-30 bg-white mt-[calc(var(--header-height)+5.5rem)] overflow-y-auto"
                : "hidden"
            } 
            md:relative md:block md:z-0
          `}
          >
            <div className="bg-white rounded-lg shadow-sm overflow-y-auto hover-scrollbar sticky top-[calc(var(--header-height)+5.5rem)] max-h-[calc(100vh-var(--header-height)-6rem)]">
              {/* 모바일 카테고리 헤더 */}
              <div className="p-4 border-b md:hidden">
                <div className="flex items-center justify-between">
                  <h2 className="font-bold">카테고리</h2>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 hover:bg-gray-100 rounded-full"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {Object.values(CATEGORIES_DATA).map((category) => (
                <div key={category.id}>
                  <button
                    className={`w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors
                              ${
                                selectedCategory === category.id
                                  ? "border-l-2 border-[#00d4b3] bg-gray-50"
                                  : ""
                              }
                              ${
                                expandedCategory === category.id
                                  ? "border-l-2 border-[#00d4b3]"
                                  : ""
                              }`}
                    onClick={() => handleCategorySelect(category.id)}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{category.icon}</span>
                      <span className="font-medium">{category.name}</span>
                    </div>
                    <ChevronRight
                      className={`w-4 h-4 transition-transform ${
                        expandedCategory === category.id ? "rotate-90" : ""
                      }`}
                    />
                  </button>

                  {expandedCategory === category.id && (
                    <div className="bg-gray-50">
                      {Object.entries(category.subCategories).map(
                        ([subId, sub]) => (
                          <div key={subId}>
                            <button
                              className={`w-full px-6 py-2 text-sm text-left hover:bg-gray-100 transition-colors flex items-center justify-between
                                      ${
                                        selectedSubCategory === sub.name
                                          ? "text-[#00d4b3] bg-white"
                                          : "text-gray-600"
                                      }
                                      ${
                                        expandedSubCategory === sub.name
                                          ? "text-[#00d4b3]"
                                          : ""
                                      }`}
                              onClick={() => handleSubCategorySelect(sub.name)}
                            >
                              {sub.name}
                              <ChevronRight
                                className={`w-3 h-3 transition-transform ${
                                  expandedSubCategory === sub.name
                                    ? "rotate-90"
                                    : ""
                                }`}
                              />
                            </button>

                            {expandedSubCategory === sub.name && (
                              <div className="bg-white py-1">
                                {sub.skills.map((skill, idx) => (
                                  <button
                                    key={idx}
                                    className={`w-full px-8 py-1.5 text-xs text-left hover:bg-gray-50 transition-colors
                                            ${
                                              selectedSkill === skill
                                                ? "text-[#00d4b3] bg-gray-50"
                                                : "text-gray-500 hover:text-[#00d4b3]"
                                            }`}
                                    onClick={() => handleSkillSelect(skill)}
                                  >
                                    {skill}
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                        )
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* 스킬 리스트 */}
          <div
            className={`md:col-span-8 ${
              isMobileMenuOpen ? "hidden" : "block"
            } md:block`}
          >
            <div
              id="card-section"
              className="overflow-y-auto hover-scrollbar"
              style={{ height: "calc(100vh - var(--header-height) - 6rem)" }}
            >
              {/* 정렬 옵션과 결과 카운트 */}
              <div className="flex justify-between items-center mb-4 sticky top-0 bg-gray-50 p-4 rounded-lg">
                <h2 className="text-lg font-bold">
                  {selectedCategory
                    ? `${CATEGORIES_DATA[selectedCategory].name} ${
                        selectedSubCategory ? `> ${selectedSubCategory}` : ""
                      } ${selectedSkill ? `> ${selectedSkill}` : ""}`
                    : "전체 스킬"}
                  <span className="text-sm font-normal text-gray-500 ml-2">
                    총 {filteredSkills.length}개
                  </span>
                </h2>
                <div className="flex gap-2">
                  {["평점 높은순", "최근 등록순", "리뷰 많은순"].map(
                    (option) => (
                      <button
                        key={option}
                        className={`px-3 py-1.5 text-sm rounded-full transition-colors whitespace-nowrap
                                ${
                                  sortOption === option
                                    ? "bg-[#00d4b3] text-white"
                                    : "text-gray-600 hover:bg-gray-100"
                                }`}
                        onClick={() => setSortOption(option)}
                      >
                        {option}
                      </button>
                    )
                  )}
                </div>
              </div>

              {/* 필터링된 스킬 카드 리스트 */}
              {filteredSkills.length > 0 ? (
                <>
                  <div className="space-y-4">
                    {currentItems.map((skill) => (
                      <div
                        key={skill.id}
                        className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
                      >
                        <div className="p-4">
                          <div className="flex gap-4">
                            <div className="w-14 h-14 rounded-full overflow-hidden flex-shrink-0 bg-[#e6f7f4]">
                              <img
                                src={skill.user.image}
                                alt={skill.user.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2">
                                <div>
                                  <h3 className="font-medium">{skill.title}</h3>
                                  <div className="flex items-center gap-1 text-sm">
                                    <Star className="w-4 h-4 text-[#00d4b3] fill-current" />
                                    <span className="font-medium">
                                      {skill.user.rating}
                                    </span>
                                    <span className="text-gray-400">
                                      · 리뷰 {skill.user.reviews}
                                    </span>
                                  </div>
                                </div>
                              </div>

                              <p className="text-gray-600 text-sm mt-2 line-clamp-2">
                                {skill.description}
                              </p>

                              <div className="flex flex-wrap gap-1.5 mt-3">
                                {skill.tags.map((tag, idx) => (
                                  <span
                                    key={idx}
                                    className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>

                              <div className="flex items-center justify-between mt-3 pt-3 border-t">
                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                  <MapPin className="w-4 h-4" />
                                  <span>{skill.user.location}</span>
                                  <span>·</span>
                                  <Clock className="w-4 h-4" />
                                  <span>{skill.availability}</span>
                                </div>
                                <span className="font-medium">
                                  {skill.price}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* 페이지네이션 */}
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                </>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500">해당하는 스킬이 없습니다.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        /* 스크롤바 숨김 및 hover시에만 표시 */
        .hover-scrollbar {
          scrollbar-width: none; /* Firefox */
          -ms-overflow-style: none; /* IE and Edge */
        }

        .hover-scrollbar::-webkit-scrollbar {
          width: 8px;
          display: none;
        }

        .hover-scrollbar:hover::-webkit-scrollbar {
          display: block;
        }

        .hover-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }

        .hover-scrollbar::-webkit-scrollbar-thumb {
          background-color: #cbd5e0;
          border-radius: 4px;
        }

        .hover-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: #a0aec0;
        }
      `}</style>
    </Layout>
  );
};

export default CategoriesPage;
