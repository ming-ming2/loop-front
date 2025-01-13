import React, { useState, useEffect, useRef } from "react";
import { Search, X } from "lucide-react";

// 임시 추천 데이터
const suggestions = [
  { id: 1, text: "기타 레슨", category: "레슨/교육", count: 15 },
  { id: 2, text: "영어 회화", category: "레슨/교육", count: 23 },
  { id: 3, text: "웹 개발", category: "IT/기술", count: 18 },
  { id: 4, text: "요가 수업", category: "레슨/교육", count: 12 },
  { id: 5, text: "포토샵 기초", category: "IT/기술", count: 9 },
];

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const searchRef = useRef(null);

  useEffect(() => {
    // 검색어에 따른 추천 검색어 필터링
    if (searchTerm.trim()) {
      const filtered = suggestions.filter((item) =>
        item.text.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredSuggestions(filtered);
    } else {
      setFilteredSuggestions([]);
    }
  }, [searchTerm]);

  // 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={searchRef} className="relative max-w-2xl mx-auto">
      <div
        className={`
          transform transition-all duration-300
          ${isFocused ? "scale-105" : "scale-100"}
        `}
      >
        <div
          className={`
          relative flex items-center bg-white rounded-full shadow-lg
          ${isFocused ? "ring-2 ring-mint-500" : ""}
        `}
        >
          <Search className="absolute left-6 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setIsFocused(true)}
            placeholder="어떤 재능이 필요하세요?"
            className="w-full pl-16 pr-20 py-4 rounded-full focus:outline-none text-lg"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-20 p-2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          )}
          <button className="absolute right-3 px-6 py-2 bg-mint-500 text-white rounded-full hover:bg-mint-600 transition-colors">
            검색
          </button>
        </div>
      </div>

      {/* 자동완성 드롭다운 */}
      {isFocused && filteredSuggestions.length > 0 && (
        <div className="absolute w-full mt-2 bg-white rounded-2xl shadow-lg overflow-hidden animate-slideDown z-50">
          {filteredSuggestions.map((suggestion) => (
            <button
              key={suggestion.id}
              className="w-full px-6 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors"
              onClick={() => {
                setSearchTerm(suggestion.text);
                setIsFocused(false);
              }}
            >
              <div className="flex items-center space-x-3">
                <Search className="w-4 h-4 text-gray-400" />
                <div className="text-left">
                  <div className="font-medium">{suggestion.text}</div>
                  <div className="text-sm text-gray-500">
                    {suggestion.category}
                  </div>
                </div>
              </div>
              <span className="text-sm text-gray-400">
                {suggestion.count}개의 재능
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
