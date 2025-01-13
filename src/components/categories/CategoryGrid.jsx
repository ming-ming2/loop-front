import React from "react";
import { useNavigate } from "react-router-dom";

const categories = [
  { id: "all", name: "전체보기", icon: "🌐", desc: "모든 재능 둘러보기" },
  { id: "lesson", name: "레슨/교육", icon: "📚", desc: "음악, 요가, 외국어" },
  {
    id: "lifestyle",
    name: "라이프스타일",
    icon: "🏠",
    desc: "청소, 정리, 요리",
  },
  { id: "it", name: "IT/기술", icon: "💻", desc: "IT, 코딩, 번역" },
  { id: "art", name: "예술/창작", icon: "🎨", desc: "그림, 사진, 디자인" },
  { id: "tutoring", name: "과외", icon: "📖", desc: "중고등 과외, 입시" },
];

const CategoryGrid = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (categoryId) => {
    if (categoryId === "all") {
      navigate("/categories");
    } else {
      navigate(`/categories?category=${categoryId}`);
    }
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => handleCategoryClick(category.id)}
          className="p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 text-center group"
        >
          <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">
            {category.icon}
          </div>
          <div className="text-sm font-medium text-gray-900 mb-1.5">
            {category.name}
          </div>
          <div className="text-xs text-gray-500 overflow-hidden text-ellipsis whitespace-nowrap">
            {category.desc}
          </div>
        </button>
      ))}
    </div>
  );
};

export default CategoryGrid;
