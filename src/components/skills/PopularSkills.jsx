import React from "react";
import { Star, Clock, Heart } from "lucide-react";

const popularSkills = [
  {
    name: "기타 레슨",
    icon: "🎸",
    time: "평균 2시간",
    rating: 4.9,
    reviews: 128,
    description: "초보자도 쉽게 배우는 기타 기초",
  },
  {
    name: "번역 도움",
    icon: "🌍",
    time: "평균 1시간",
    rating: 4.8,
    reviews: 256,
    description: "영어/일어/중국어 번역 서비스",
  },
  {
    name: "요가 지도",
    icon: "🧘‍♀️",
    time: "평균 1.5시간",
    rating: 4.9,
    reviews: 184,
    description: "집에서 하는 맞춤형 요가 클래스",
  },
];

const PopularSkills = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {popularSkills.map((skill) => (
        <div key={skill.name} className="bg-gray-50 rounded-2xl p-6 card-hover">
          <div className="flex items-center justify-between mb-4">
            <div className="text-3xl">{skill.icon}</div>
            <div className="flex items-center space-x-1 bg-white px-3 py-1 rounded-full">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="text-sm font-medium">{skill.rating}</span>
            </div>
          </div>
          <h3 className="text-lg font-bold mb-2">{skill.name}</h3>
          <p className="text-gray-600 text-sm mb-4">{skill.description}</p>
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              {skill.time}
            </div>
            <div className="flex items-center">
              <Heart className="w-4 h-4 mr-1" />
              {skill.reviews}개의 후기
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PopularSkills;
